/**
 * Created by Tongming on 2016/12/27.
 */
import {dictToString,dictToJson} from './utils'
import 'whatwg-fetch'
import Promise from 'promise-polyfill'
let baseUrl = 'http://119.29.57.187/api';
// let baseUrl = 'http://127.0.0.1:5000/api';

export default function (params) {
	//低版本的浏览器不支持promise
	if(!window.Promise){
		window.Promise = Promise;
	}

	let headers = {
		"Content-Type": "application/json, text/plain, */*",
		'Access-Control-Allow-Origin': '*',
	}

	if(params.method === 'GET'){
		let query = params.query===undefined?'':('?' + dictToString(params.query));	
		return fetch(baseUrl + params.path + query,{
				method:params.method,
				headers,
				mode:'cors',
				cache:'default'
			})
				.then(res=>res.json())
				.then(checkStatus)			
				.then(json=>{
					params.onSuccess(json)
				})
				.catch((error) => {
					console.log(error)
					params.onFail(error);
				});
	}else if(params.method === 'POST'){
		let query = params.query === undefined ? '' : dictToJson(params.query)
		return fetch(baseUrl + params.path,{
				method:params.method,
				headers,
				body:query,
				mode:'cors',
				cache:'default',
			})
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