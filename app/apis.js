/**
 * Created by Tongming on 2016/12/27.
 */
import {dictToString} from './utils'
let baseUrl = 'http://119.29.57.187';

export default function (params) {
	//保证连接成功
	/*if (!params.query) {
		fetch(baseUrl)
			.then((res) => {
				// console.log(res.body);
			}, (error) => {
				console.log('test error');
			});
	}*/

	//真正起作用的地方 - -
	return fetch(baseUrl + params.path + '?' + dictToString(params.query), {
		method: params.method,
		headers: new Headers({'Access-Control-Allow-Origin': '*'}),
		mode: 'cors',
		cache: 'default',
	})
		.then(res=>res.json())
		.then(json=>params.onSuccess(json))
		.catch((error) => {
			params.onFail(error);
		});
}