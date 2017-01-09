/**
 * Created by Tongming on 2016/12/27.
 */
let baseUrl = 'http://119.29.57.187';

export default function (params) {
	//保证连接成功
	fetch(baseUrl)
		.then((res) => {
			// console.log(res.body);
		}, (error) => {
			console.log('test error');
		});

	//真正起作用的地方 - -
	fetch(baseUrl + params.path + '?' + dictToString(params.query), {
		method: params.method,
		mode: 'cors',
		cache: 'default',
	})
		.then((res) => {
			res.json().then((json) => {
				params.onSuccess(json);
			})
		}, (error) => {
			params.onFail(error);
		})
}

function dictToString(dict) {
	let result = '';
	for (let key in dict) {
		try {
			result += '&' + key + '=' + dict[key];
		}catch (error){
			console.log(error);
		}
	}
	return result;
}