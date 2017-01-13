/**
 * Created by Tongming on 2017/1/12.
 */
import api from '../apis'
import {dictToString} from '../utils'
import {
	RECEIVE_DATA, REQUEST_FAIL, REQUEST_DATA,
	HOME, CATEGORY, DETAIL, SEARCH, PAGE, COLLECTION, USER,
	CHANGE_PAGE, CONTROLLER, SEARCH_CHANGE,
	BANNER_CHANGED, SCROLL_BAR,
} from '../constants/Const'

/**
 * 开始请求
 */
function requestData(params) {
	return {
		type: REQUEST_DATA + params.category,
		params: params
	}
}

/**
 * 接受数据
 * @param json 接受的数据
 */
function receiveData(params, json) {
	return {
		type: RECEIVE_DATA + params.category,
		params: params,
		data: json,
	}
}

/**
 * 请求失败
 */
function requestFail(params) {
	return {
		type: REQUEST_FAIL + params.category,
		params: params,
	}
}

/**
 * 发送请求的具体方法
 */
function fetchData(params) {
	return dispatch => {
		dispatch(requestData(params));
		return api({
			method: params.method,
			path: params.path,
			query: params.query,
			onSuccess: json => dispatch(receiveData(params, json)),
			onFail: error => dispatch(requestFail(params))
		})
	}
}

/**
 * 判断是否需要获取数据
 * @param state 全局state
 * @param params 参数
 * @param dispatch 分发器
 */
function shouldFetchData(state, params, dispatch) {
	switch (params.category) {
		case HOME:
			return state.homeReducer.data === undefined;
		case CATEGORY:
			return state.categoryReducer.category === undefined;
		case COLLECTION:
			return state.collectionReducer.data === undefined;
		case DETAIL:
			if (state.detailReducer.data !== undefined) {
				return state.detailReducer.data.comic_url !== params.query.comic_url
			}
			break;
		case SEARCH:
			let reg = new RegExp('(.*)&');
			let isChange = reg.exec(dictToString(params.query))[1] !==
				(state.searchReducer.query === undefined ? '' : reg.exec(dictToString(state.searchReducer.query))[1]);
			if (isChange) {
				dispatch(searchChange());
			}
			if (state.searchReducer.items !== [] && state.searchReducer.query !== undefined) {
				//根据word或type判断,发生改变时将items清除
				if (state.searchReducer.query.word !== params.query.word) {
					return true;
				} else if (state.searchReducer.query.type !== params.query.type) {
					return true;
				}
			}
			break;
		case PAGE:
			if (state.detailReducer.imgs !== undefined) {
				return state.detailReducer.chapterUrl !== params.query.chapter_url
			}
			break;
		case USER:
			return state.userReducer.data === undefined;
	}
	return true;
}

/**
 * 搜索页发生改变
 */
function searchChange() {
	return {
		type: SEARCH_CHANGE
	}
}

/**
 * 如果需要则开始获取数据
 * @param params 参数
 */
export function fetchDataIfNeed(params) {
	return (dispatch, getState) => {
		if (shouldFetchData(getState(), params, dispatch)) {
			return dispatch(fetchData(params))
		}
	}
}

/**
 * 监听page
 * @param currentIndex 阅读位置
 */
export function changePage(currentIndex) {
	return {
		type: CHANGE_PAGE,
		currentIndex: currentIndex,
	}
}

/**
 * 控制面板的显示隐藏
 * @param shown 显示隐藏
 */
export function handleController(shown) {
	return {
		type: CONTROLLER,
		shown: shown,
	}
}
/**
 * 监听banner
 * @param currentIndex banner位置
 */
export function onLoop(currentIndex) {
	return {
		type: BANNER_CHANGED,
		currentIndex: currentIndex,
	}
}

/**
 * 记录滚动条滚动的位置
 * @param location 位置信息
 * @param type 指定页面
 */
export function recordLoaction(location, type) {
	return {
		type: SCROLL_BAR + type,
		location: location,
	}
}
