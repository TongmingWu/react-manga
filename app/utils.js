/**
 * 工具类
 * Created by Tongming on 2016/12/30.
 */

/**
 * 检查字典对象是否为空
 */
export function isEmpty(obj) {
	return Object.getOwnPropertyNames(obj).length <= 0;
}

/**
 * 读取UTF8编码的字节，并转为Unicode的字符串
 */
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
		if (v && one.length === 8) {
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

/**
 * 将字典转化为GET中query的模式
 */
export function dictToString(dict) {
	let result = '';
	// console.log(dict)
	for (let key in dict) {
		try {
			if (result === '') {
				result = key + '=' + dict[key];
			} else {
				result += '&' + key + '=' + dict[key];
			}
		} catch (error) {
			console.log(error);
		}
	}
	return result;
}

/**
 * 获取屏幕宽度
 */
export function getScreenWidth() {
	return document.documentElement.clientWidth;
	// return window.screen.width;
}

/**
 * 获取屏幕高度
 */
export function getScreenHeight() {
	return document.documentElement.clientHeight;
}

/**
 * 离最顶部的高度
 */
export function getDocumentTop() {
	let scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
	if (document.body) {
		bodyScrollTop = document.body.scrollTop;
	}
	if (document.documentElement) {
		documentScrollTop = document.documentElement.scrollTop;
	}
	scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
	return scrollTop;
}

/**
 * 可视窗口高度
 */
export function getWindowHeight() {
	let windowHeight = 0;
	if (document.compatMode === "CSS1Compat") {
		windowHeight = document.documentElement.clientHeight;
	} else {
		windowHeight = document.body.clientHeight;
	}
	return windowHeight;
}

/**
 * 滚动条总的滚动高度
 */
export function getScrollHeight() {
	let scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
	if (document.body) {
		bodyScrollHeight = document.body.scrollHeight;
	}
	if (document.documentElement) {
		documentScrollHeight = document.documentElement.scrollHeight;
	}
	scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
	return scrollHeight;
}

