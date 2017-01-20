/**
 * Created by Tongming on 2016/12/27.
 */
import {dictToString} from './utils'
import wFetch from 'whatwg-fetch'
let baseUrl = 'http://119.29.57.187';

export default function (params) {
	//真正起作用的地方 - -
	if(window.fetch){
		let query = params.query===undefined?'':('?' + dictToString(params.query));
		return fetch(baseUrl + params.path + query, {
			method: params.method,
			headers: new Headers({'Access-Control-Allow-Origin': '*'}),
			mode: 'cors',
			cache: 'default',
		})
			.then(res=>res.json())
			.then(json=>{
				params.onSuccess(json)
			})
			.catch((error) => {
				params.onFail(error);
			});
	}else{
		console.log('浏览器不支持fetch')
		return wFetch(baseUrl + params.path + query)
			.then(res=>res.json())
			.then(json=>{
				params.onSuccess(json)
			})
			.catch((error) => {
				params.onFail(error);
			});
	}
}