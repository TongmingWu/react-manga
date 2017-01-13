/**
 * Created by Tongming on 2016/12/30.
 */
import {combineReducers} from 'redux'
import {dictToString} from '../utils'
import {
	RECEIVE_DATA, REQUEST_FAIL, REQUEST_DATA,
	HOME, SEARCH, CATEGORY, DETAIL, PAGE, COLLECTION, USER,
	CHANGE_PAGE, CONTROLLER, SEARCH_CHANGE, BANNER_CHANGED,
	SCROLL_BAR,
} from '../constants/Const'

/**
 * 首页的reducer
 */
function homeReducer(state = {
	currentIndex: 0,
}, action) {
	switch (action.type) {
		case REQUEST_DATA + HOME:
			console.log(REQUEST_DATA);
			return Object.assign({}, state, {
				status: 0
			});
		case RECEIVE_DATA + HOME:
			console.log(RECEIVE_DATA);
			return Object.assign({}, state, {
				data: action.data,
				status: 1,
			});
		case REQUEST_FAIL + HOME:
			console.log(REQUEST_FAIL);
			return Object.assign({}, state, {
				status: -1
			});
		case BANNER_CHANGED:
			return Object.assign({}, state, {
				currentIndex: action.currentIndex,
			});
		default:
			return state;
	}
}

/**
 * 分类的reducer
 */
function categoryReducer(state = {}, action) {
	switch (action.type) {
		case REQUEST_DATA + CATEGORY:
			console.log(REQUEST_DATA);
			return Object.assign({}, state, {
				status: 0
			});
		case RECEIVE_DATA + CATEGORY:
			console.log(RECEIVE_DATA);
			return Object.assign({}, state, {
				category: action.data.category,
				status: 1,
			});
		case REQUEST_FAIL + CATEGORY:
			console.log(REQUEST_FAIL);
			return Object.assign({}, state, {
				status: -1
			});
		default:
			return state;
	}
}

/**
 * 搜索的reducer
 */
function searchReducer(state = {
	items: [], page: 1, isChange: false
}, action) {
	switch (action.type) {
		case REQUEST_DATA + SEARCH:
			console.log(REQUEST_DATA);
			return Object.assign({}, state, {
				status: 0,
				query: action.params.query,
			});
		case RECEIVE_DATA + SEARCH:
			console.log(RECEIVE_DATA);
			return Object.assign({}, state, {
				items: (state.items !== [] && !state.isChange) ?
					state.items.concat(action.data.result) : action.data.result,
				status: 1,
				page: action.data.current_page,
				next: action.data.next,
				isChange: false,
			});
		case REQUEST_FAIL + SEARCH:
			console.log(REQUEST_FAIL);
			return Object.assign({}, state, {
				items: [],
				status: -1
			});
		case SEARCH_CHANGE:
			console.log(SEARCH_CHANGE);
			return Object.assign({}, state, {
				items: [],
				isChange: true,
			});
		default:
			return state;
	}
}

/**
 * 详情页的reducer
 */
function detailReducer(state = {}, action) {
	switch (action.type) {
		case REQUEST_DATA + DETAIL:
			console.log(REQUEST_DATA);
			return Object.assign({}, state, {
				status: 0
			});
		case RECEIVE_DATA + DETAIL:
			console.log(RECEIVE_DATA);
			return Object.assign({}, state, {
				data: action.data,
				status: 1,
			});
		case REQUEST_FAIL + DETAIL:
			console.log(REQUEST_FAIL);
			return Object.assign({}, state, {
				status: -1
			});
		default:
			return state;
	}
}

/**
 * view reducer
 */
function pageReducer(state = {}, action) {
	switch (action.type) {
		case REQUEST_DATA + PAGE:
			console.log(REQUEST_DATA);
			return Object.assign({}, state, {
				status: 0,
				shown: false,
				imgs: [],
			});
		case RECEIVE_DATA + PAGE:
			console.log(RECEIVE_DATA);
			return Object.assign({}, state, {
				imgs: action.data.img_list,
				title: action.data.chapter_name,
				total: action.data.img_list.length,
				preUrl: action.data.pre_chapter_url,
				nextUrl: action.data.next_chapter_url,
				next: action.data.next,
				prepare: action.data.prepare,
				currentIndex: 1,
				status: 1,
				shown: true,
				chapterUrl: action.data.current_chapter_url,
			});
		case REQUEST_FAIL + PAGE:
			console.log(REQUEST_FAIL);
			return Object.assign({}, state, {
				status: -1
			});
		case CHANGE_PAGE:
			return Object.assign({}, state, {
				currentIndex: action.currentIndex < state.total
					? action.currentIndex : state.total - 1,
			});
		case CONTROLLER:
			return Object.assign({}, state, {
				shown: action.shown,
			});
		default:
			return state;
	}
}

/**
 * 收藏的reducer
 */
function collectionReducer(state = {}, action) {
	switch (action.type) {
		case COLLECTION:
			return state.concat(action.collection);
		default:
			return state;
	}
}

/**
 * 用户信息的reducer
 */
function userReducer(state = {}, action) {
	switch (action.type) {
		case USER:
			return state.user = action.user;
		default:
			return state;
	}
}

export default combineReducers({
	homeReducer,
	categoryReducer,
	searchReducer,
	detailReducer,
	pageReducer,
	collectionReducer,
	userReducer
})