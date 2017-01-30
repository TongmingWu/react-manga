/**
 * Created by Tongming on 2016/12/30.
 */
import {combineReducers} from 'redux'
import {
	RECEIVE_DATA, REQUEST_FAIL, REQUEST_DATA,
	HOME, SEARCH, CATEGORY, DETAIL, PAGE, COLLECTION, USER,
	CHANGE_PAGE, CONTROLLER, SEARCH_CHANGE, BANNER_CHANGED,
	SCROLL_BAR, INIT_IMAGE, DRAW_LAYOUT,TOOLBAR,INPUT_VALUE,
	HISTORY_CHAPTER,HISTORY,LOGIN,LOGON,PHONE,PASSWORD,
} from '../constants/Const'
import {OPENED, CLOSE, RUNNING} from '../components/DrawLayout'

function appReducer(state = {
	drawStatus: CLOSE,
}, action) {
	switch (action.type) {
		case DRAW_LAYOUT:
			return Object.assign({}, state, {
				drawStatus: action.drawStatus,
			});
		//添加横竖屏切换
		default:
			return state;
	}
}

/**
 * 首页的reducer
 */
function homeReducer(state = {
	currentIndex: 0, localTop: 0, isInit: false,
}, action) {
	switch (action.type) {
		case REQUEST_DATA + HOME:
			return Object.assign({}, state, {
				status: 0
			});
		case RECEIVE_DATA + HOME:
			return Object.assign({}, state, {
				data: action.data,
				status: 1,
			});
		case REQUEST_FAIL + HOME:
			return Object.assign({}, state, {
				status: -1
			});
		case BANNER_CHANGED:
			return Object.assign({}, state, {
				currentIndex: action.currentIndex,
			});
		case SCROLL_BAR + HOME:
			return Object.assign({}, state, {
				localTop: action.localTop
			});
		case INIT_IMAGE + HOME:
			return Object.assign({}, state, {
				isInit: action.isInit,
			});
		default:
			return state;
	}
}

/**
 * 分类的reducer
 */
function categoryReducer(state = {
	localTop: 0,
}, action) {
	switch (action.type) {
		case REQUEST_DATA + CATEGORY:
			return Object.assign({}, state, {
				status: 0
			});
		case RECEIVE_DATA + CATEGORY:
			return Object.assign({}, state, {
				category: action.data.category,
				status: 1,
			});
		case REQUEST_FAIL + CATEGORY:
			return Object.assign({}, state, {
				status: -1
			});
		case SCROLL_BAR + CATEGORY:
			return Object.assign({}, state, {
				localTop: action.localTop
			});
		case INPUT_VALUE:
			return Object.assign({},state,{
				inputValue:action.inputValue,
			});
		default:
			return state;
	}
}

/**
 * 搜索的reducer
 */
function searchReducer(state = {
	items: [], page: 1, isChange: false, isInit: false,
}, action) {
	switch (action.type) {
		case REQUEST_DATA + SEARCH:
			return Object.assign({}, state, {
				status: 0,
				query: action.params.query,
				title: action.params.title,
			});
		case RECEIVE_DATA + SEARCH:
			return Object.assign({}, state, {
				items: (state.items !== [] && !state.isChange) ?
					state.items.concat(action.data.result) : action.data.result,
				status: 1,
				page: action.data.current_page,
				next: action.data.next,
				isChange: false,
			});
		case REQUEST_FAIL + SEARCH:
			return Object.assign({}, state, {
				items: [],
				status: -1
			});
		case SEARCH_CHANGE:
			return Object.assign({}, state, {
				items: [],
				isChange: true,
			});
		case SCROLL_BAR + SEARCH:
			return Object.assign({}, state, {
				localTop: action.localTop
			});
		case INIT_IMAGE + SEARCH:
			return Object.assign({}, state, {
				isInit: action.isInit,
			});
		default:
			return state;
	}
}

/**
 * 详情页的reducer
 */
function detailReducer(state = {
	localTop: 0, status: 0, opacity:0,
}, action) {
	switch (action.type) {
		case REQUEST_DATA + DETAIL:
			return Object.assign({}, state, {
				status: 0
			});
		case RECEIVE_DATA + DETAIL:
			return Object.assign({}, state, {
				data: action.data,
				status: 1,
			});
		case REQUEST_FAIL + DETAIL:
			return Object.assign({}, state, {
				status: -1
			});
		case SCROLL_BAR + DETAIL:
			console.log('localTop = ' + action.localTop);
			return Object.assign({}, state, {
				localTop: action.localTop
			});
		case TOOLBAR:
			return Object.assign({}, state, {
				opacity: action.opacity,
			});
		case HISTORY_CHAPTER:
			return Object.assign({}, state, {
				historyUrl:action.historyUrl,
			});
		default:
			return state;
	}
}

/**
 * view reducer
 */
function pageReducer(state = {
	imgs:[],
}, action) {
	switch (action.type) {
		case REQUEST_DATA + PAGE:
			console.log('request page')
			return Object.assign({}, state, {
				status: 0,
				shown: false,
				imgs: [],
				title: '',
				total: 0,
				currentIndex: 0,
			});
		case RECEIVE_DATA + PAGE:
			return Object.assign({}, state, {
				imgs: action.data.img_list,
				title: action.data.chapter_name,
				total: action.data.img_list.length,
				currentIndex: 1,
				preUrl: action.data.pre_chapter_url,
				nextUrl: action.data.next_chapter_url,
				next: action.data.next,
				prepare: action.data.prepare,
				status: 1,
				shown: true,
				comicName:action.data.comic_name,
				comicSource:action.data.comic_source,
				chapterUrl: action.data.current_chapter_url,
			});
		case REQUEST_FAIL + PAGE:
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
 * 历史记录
 */
function historyReducer(state={},action){
	switch (action.type) {
		case HISTORY:
			return Object.assign({}, state, {
				items: action.items,
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
function userReducer(state = {
	user:{
		uid:1,
		name:'',
		sex:'',
		personality:'',
		phone:'',
		collection:[],
		logon_date:0,
		avatar:''
	},
	status:-3,
}, action) {
	switch (action.type) {
		case REQUEST_DATA + USER:
			return Object.assign({}, state, {
				status: 0
			});
		case RECEIVE_DATA + USER:
			return Object.assign({}, state, {
				user : action.data.user,
				status: 1,
			});
		case REQUEST_FAIL + USER:
			return Object.assign({}, state, {
				status: -1
			});
		default:
			return state;
	}
}

/**
 * 登录的reducer
 */
function loginReducer(state={
	data:{
		code:500,
	},
},action){
	switch (action.type) {
		case REQUEST_DATA + LOGIN:
			return Object.assign({}, state, {
				status: 0
			});
		case RECEIVE_DATA + LOGIN:
			return Object.assign({}, state, {
				data: action.data,
				status: 1,
			});
		case REQUEST_FAIL + LOGIN:
			return Object.assign({}, state, {
				status: -1
			});
		case LOGIN + PHONE:
			return Object.assign({}, state, {
				phone:action.value,
			});
		case LOGIN + PASSWORD:
			return Object.assign({}, state, {
				password:action.value,
			});
		default:
			return state;
	}
}

/**
 * 注册的reducer
 */
function logonReducer(state={},action){
	switch (action.type) {
		case LOGON:
			return Object.assign({},state,{

			});
		default:
			return state;
	}
}

export default combineReducers({
	appReducer,
	homeReducer,
	categoryReducer,
	searchReducer,
	detailReducer,
	pageReducer,
	historyReducer,
	collectionReducer,
	userReducer,
	loginReducer,
	logonReducer,
})