/**
 * Created by Tongming on 2017/1/12.
 */
import api from '../apis'
import {dictToString} from '../utils'
import {
    RECEIVE_DATA, REQUEST_FAIL, REQUEST_DATA,
    HOME, CATEGORY, DETAIL, SEARCH, PAGE, COLLECTION, USER,
    CHANGE_PAGE, CONTROLLER, SEARCH_CHANGE,TOOLBAR,INPUT_VALUE,
    BANNER_CHANGED, SCROLL_BAR, INIT_IMAGE, DRAW_LAYOUT,
    HISTORY_CHAPTER,HISTORY,LOGIN,LOGON,PHONE,PASSWORD,COLLECT,
    DISCOLLECT,CODE_TIMER,
} from '../constants/Const'

/**
 * 开始请求
 */
function requestData(requests) {
    return {
        type: REQUEST_DATA + requests.category,
        requests,
    }
}

/**
 * 接受数据
 * @param json 接受的数据
 */
function receiveData(requests, json) {
    return {
        type: RECEIVE_DATA + requests.category,
        requests,
        data: json,
    }
}

/**
 * 请求失败
 */
function requestFail(requests) {
    return {
        type: REQUEST_FAIL + requests.category,
        requests,
    }
}

/**
 * 发送请求的具体方法
 */
function fetchData(requests) {
    return dispatch => {
        dispatch(requestData(requests[0]));
        return api({
            // method: requests[0].method,
            // path: requests[0].path,
            // query: requests[0].query,
            requests,
            onSuccess: json => dispatch(receiveData(requests[0], json)),
            onFail: error => dispatch(requestFail(requests[0]))
        })
    }
}

/**
 * 判断是否需要获取数据
 * @param state 全局state
 * @param requests 参数
 * @param dispatch 分发器
 */
function shouldFetchData(state, requests, dispatch) {
    switch (requests[0].category) {
        case HOME:
            return state.homeReducer.data === undefined;
        case CATEGORY:
            return state.categoryReducer.category === undefined;
        case COLLECTION:
            return state.collectionReducer.data === undefined;
        case DETAIL:
            if (state.detailReducer.data !== undefined) {
                if (state.detailReducer.data.comic_url === requests[0].query.comic_url) {
                    return false;
                }
                dispatch(recordLocation(0, DETAIL));
                return true;
            }
            break;
        case SEARCH:
            let reg = new RegExp('(.*)&');
            let isChange = reg.exec(dictToString(requests[0].query))[1] !==
                (state.searchReducer.query === undefined ? '' : reg.exec(dictToString(state.searchReducer.query))[1]);
            if (isChange) {
                dispatch(searchChange());
                dispatch(recordLocation(0, SEARCH));
                return true;
            }
            return state.searchReducer.items !== [] && requests[0].query.page !== state.searchReducer.page;
        case PAGE:
            if (state.pageReducer.imgs.length>0) {
                return state.pageReducer.chapterUrl !== requests[0].query.chapter_url
            }
            break;
        case LOGIN:
            break;
        case LOGON:
            break;
        case USER:
            // return state.userReducer.user.name === '';
            break;
        case COLLECT:
            break;
        case DISCOLLECT:
            break;
        default:
            break;
    }
    return true;
}

/**
 * 如果需要则开始获取数据
 * @param requests 参数
 */
export function fetchDataIfNeed(...requests) {
    return (dispatch, getState) => {
        if (shouldFetchData(getState(), requests, dispatch)) {
            return dispatch(fetchData(requests))
        }
    }
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
 * 监听page
 * @param currentIndex 阅读位置
 */
export function changePage(currentIndex) {
    return {
        type: CHANGE_PAGE,
        currentIndex,
    }
}

/**
 * 控制面板的显示隐藏
 * @param shown 显示隐藏
 */
export function handleController(shown) {
    return {
        type: CONTROLLER,
        shown,
    }
}
/**
 * 监听banner
 * @param currentIndex banner位置
 */
export function onLoop(currentIndex) {
    return {
        type: BANNER_CHANGED,
        currentIndex,
    }
}

/**
 * 记录滚动条滚动的位置
 * @param localTop 位置信息
 * @param type 指定页面
 */
export function recordLocation(localTop, type) {
    return {
        type: SCROLL_BAR + type,
        localTop,
    }
}

/**
 * 记录图片初始化完毕
 */
export function initImage(isInit, type) {
    return {
        type: INIT_IMAGE + type,
        isInit
    }
}

/**
 * 记录侧滑菜单状态
 */
export function handleDrawLayout(status) {
    return {
        type: DRAW_LAYOUT,
        drawStatus: status,
    }
}

/**
 * 记录Toolbar状态
 */
export function updateOpacity(opacity){
    return{
        type: TOOLBAR,
        opacity,
    }
}


/**
 * 记录历史章节
 */
export function updateHistoryChapter(url){
    return{
        type:HISTORY_CHAPTER,
        historyUrl:url,
    }
}

/**
 * 更新SearchBar
 */
export function updateSearchBar(inputValue){
    return{
        type:INPUT_VALUE,
        inputValue
    }
}

/**
 * 获取阅读记录
 */
export function fetchHistory(items){
    return{
        type:HISTORY,
        items
    }
}

export function updateEditText(value,kind){
    return{
        type:kind,
        value
    }
}

export function codeTimer(value,end){
    return{
        type:CODE_TIMER,
        value,
        end,
    }
}
