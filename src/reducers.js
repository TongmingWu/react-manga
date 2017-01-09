/**
 * Created by Tongming on 2016/12/30.
 */
import {combineReducers} from 'redux'

const BANNER = 'BANNER';
const HOT = 'HOT';
const CATEGORY = 'CATEGORY';
const DETAIL = 'DETAIL';
const PAGE = 'PAGE';
const COLLECTION = 'COLLECTION';
const USER = 'USER';

//banner处理器
function bannerReducer(state = [], action) {
	switch (action.type) {
		case BANNER:
			return state.concat(action.banner);
		default:
			return state;
	}
}

function hotReducer(state = [], action) {
	switch (action.type) {
		case HOT:
			return state.concat(action.hot);
		default:
			return state;
	}
}

function categoryReducer(state = [], action) {
	switch (action.type) {
		case CATEGORY:
			return state.concat(action.category);
		default:
			return state;
	}
}

//detail处理器
function detailReducer(state = {}, action) {
	switch (action.type) {
		case DETAIL:
			return state.comicDetail = action.comicDetail;
		default:
			return state;
	}
}

//view处理器
function pageReducer(state = {}, action) {
	switch (action.type) {
		case PAGE:
			return state.comicPage = action.comicPage;
		default:
			return state;
	}
}

//collection处理器
function collectionReducer(state = [], action) {
	switch (action.type) {
		case COLLECTION:
			return state.concat(action.collection);
		default:
			return state;
	}
}

//user处理器
function userReducer(state = {}, action) {
	switch (action.type) {
		case USER:
			return state.user = action.user;
		default:
			return state;
	}
}

export default combineReducers({
	'banner': bannerReducer,
	'hot': hotReducer,
	'category': categoryReducer,
	'detail': detailReducer,
	'page': pageReducer,
	'collection': collectionReducer,
	'user': userReducer
})