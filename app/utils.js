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
export function dictToString(dict,split='&') {
	let result = '';
	// console.log(dict)
	for (let key in dict) {
		try {
			if (result === '') {
				result = key + '=' + dict[key];
			} else {
				result += split + key + '=' + dict[key];
			}
		} catch (error) {
			console.log(error);
		}
	}
	return result;
}

/**
 * 将字典转化为POST中query json的模式
 */
export function dictToJson(dict){
	let result = '';
	try{
			result = JSON.stringify(dict);
		}catch(error){
			console.log(error)
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

/**
 * rsa加密
 */
export function RSAEncrypt(encryptString){
	const publicKey ='-----BEGIN PUBLIC KEY-----\
            MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDxI+LyiBHwTJmb8lFPKrI7etgn\
            x4Hnyx0WnLLyWmOyJd1dqzxUgfIgM+oIlzYaiet4zcgByqNr5MmgEltgIOJMiU81\
            fJD+Cmyu54evL9oP7UPULwlWyQZJMxtzGNEeXg92pwmkl399Dyw2dnvt6UA9pI+Y\
            RYz+/hfNN23OGUUiNQIDAQAB\
            -----END PUBLIC KEY-----';
    let encrypt = new JSEncrypt();
	encrypt.setPublicKey(publicKey);
    encryptString = encrypt.encrypt(encryptString);
    return encryptString;
}

/**
 * 设置cookies
 */
export function setCookies(dict={},days=1){
	let time = new Date();
	time.setTime(time.getTime()+(days*24*60*60*1000));
	for(let key in dict){
		document.cookie = `${key}=${dict[key]}; expires=${time.toUTCString()}`
	}
}

/**
 * 获取cookies
 */
export function getCookies(name){
	let result = '';
	if(document.cookie.length>0){
		let start=document.cookie.indexOf(name + "=")//返回某指定值在字符串中首次出现的位置。
		if (start!=-1)
		{ 
		start = start + name.length+1; 
		let end=document.cookie.indexOf(";",start)//返回';'在字符串中首次出现的位置。
		if (end ==-1) 
			end = document.cookie.length;
			result = unescape(document.cookie.substring(start,end));
		} 
	}	
	return result;
}

/**
 * 手机格式正则
 * ^1(3[0-9]|4[57]|5[0-35-9]|7[01678]|8[0-9])\\d{8}$
 */
export function checkPhone(phone){
	if(phone===''){
		return false;
	}
	let reg = new RegExp('^1(3[0-9]|4[57]|5[0-35-9]|7[01678]|8[0-9])\\d{8}$')
	let result = reg.exec(phone)
	return result.length>0;
}
