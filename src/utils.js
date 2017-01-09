/**
 * 工具类
 * Created by Tongming on 2016/12/30.
 */

//检查字典对象是否为空
export function isEmpty(obj) {
	return Object.getOwnPropertyNames(obj).length <= 0;
}

// 读取UTF8编码的字节，并转为Unicode的字符串
export function readUTF(word) {
	let arr = word.trim().split('%');
	// arr = arr.map(parseInt(word,16));
	for (let index = 1; index < arr.length; index++) {
		arr[index] = parseInt(arr[index], 16)
	}
	let UTF = '';
	// let arr = this.init(arr);
	for (let i = 0; i < arr.length; i++) {
		let one = arr[i].toString(2),
			v = one.match(/^1+?(?=0)/);
		if (v && one.length == 8) {
			let bytesLength = v[0].length;
			let store = arr[i].toString(2).slice(7 - bytesLength);
			for (let st = 1; st < bytesLength; st++) {
				store += arr[st + i].toString(2).slice(2)
			}
			UTF += String.fromCharCode(parseInt(store, 2));
			i += bytesLength - 1
		} else {
			UTF += String.fromCharCode(arr[i])
		}
	}
	return UTF
}

//获取top距离

