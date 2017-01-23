/**
 * Created by Tongming on 2016/12/27.
 */
import {dictToString} from './utils'
import 'whatwg-fetch'
import Promise from 'promise-polyfill'
let baseUrl = 'http://119.29.57.187/api';
// let baseUrl = 'http://127.0.0.1:5000/api';

export default function (params) {
	//低版本的浏览器不支持promise
	if(!window.Promise){
		window.Promise = Promise;
	}

	let query = params.query===undefined?'':('?' + dictToString(params.query));	
	return fetch(baseUrl + params.path + query,{
			method:params.method,
			headers:{
				'Access-Control-Allow-Origin': '*'
			},
			mode:'cors',
			cache:'default'
		})
			.then(res=>res.json())
			.then(json=>{
				params.onSuccess(json)
			})
			.catch((error) => {
				params.onFail(error);
			});
	// var xhr;

	// if (window.XMLHttpRequest) {
	// 	xhr=new XMLHttpRequest();
	// } else if (window.ActiveXObject) {
	// 	xhr=new ActiveXObject("Microsoft.XMLHTTP");
	// }

	// if (xhr) {
	// 	xhr.open('GET', baseUrl+'/cc/', true); 
	// 	xhr.send(); // 调用send方法发送请求
	// }
}