/**
 * Created by Tongming on 2016/12/27.
 */
import {dictToString,dictToJson} from './utils'
import 'whatwg-fetch'
import Promise from 'promise-polyfill'

//低版本的浏览器不支持promise
if(!window.Promise){
		window.Promise = Promise;
	}

let baseUrl = 'http://119.29.57.187/api';
// let baseUrl = 'http://127.0.0.1:5000/api';

let data = {
		headers:{
			"Content-Type": "application/json, text/plain, */*",
			'Access-Control-Allow-Origin': '*',
		},
		mode:'cors',
		cache:'default',
	}
	
export default function (params) {
	if(params.requests.length>1){
		fetchAllData(params)
	}else{
		switch(params.requests[0].method){
			case 'GET':
				params.requests[0].query = params.requests[0].query===undefined?'':('?' + dictToString(params.requests[0].query));	
				return fetchData(params,Object.assign({},{
					method:params.requests[0].method,
				},data))
			case 'POST':
			case 'DELETE':
				params.requests[0].query = params.requests[0].query === undefined ? '' : JSON.stringify(params.requests[0].query)
				return fetchData(params,Object.assign({},{
					method:params.requests[0].method,
					body:params.requests[0].query,
				},data))
		}
	}
}

function fetchAllData(params){
	//使用Promise.all()
	Promise.all(params.requests.map(request=>{
		return fetch(baseUrl+request.path+'?'+dictToString(request.query),data)
		.then(res=>res.json())
	}))
		.then(json=>{
			params.onSuccess(json)
		})
		.catch(error=>{
			console.log(error)
			params.onFail(error)
		})
}

function fetchData(params,data){
	return fetch(baseUrl+params.requests[0].path+(data.method!=='GET'?'':params.requests[0].query),data)
		.then(res=>res.json())
		.then(checkStatus)			
		.then(json=>{
			params.onSuccess(json)
		})
		.catch((error) => {
			console.log(error)
			params.onFail(error);
		});
}

function checkStatus(response){
	if(response.code >=200 && response.code <= 304){
		return response
	}else{
		var error = new Error(response.message)
		error.response = response
		throw error
	}
}