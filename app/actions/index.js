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
} from '../constants/Const'

/**
 * 开始请求
 */
function requestData(params) {
    return {
        type: REQUEST_DATA + params.category,
        params,
    }
}

/**
 * 接受数据
 * @param json 接受的数据
 */
function receiveData(params, json) {
    return {
        type: RECEIVE_DATA + params.category,
        params,
        data: json,
    }
}

/**
 * 请求失败
 */
function requestFail(params) {
    return {
        type: REQUEST_FAIL + params.category,
        params,
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
                if (state.detailReducer.data.comic_url === params.query.comic_url) {
                    return false;
                }
                dispatch(recordLocation(0, DETAIL));
                return true;
            }
            break;
        case SEARCH:
            let reg = new RegExp('(.*)&');
            let isChange = reg.exec(dictToString(params.query))[1] !==
                (state.searchReducer.query === undefined ? '' : reg.exec(dictToString(state.searchReducer.query))[1]);
            if (isChange) {
                dispatch(searchChange());
                dispatch(recordLocation(0, SEARCH));
                return true;
            }
            return state.searchReducer.items !== [] && params.query.page !== state.searchReducer.page;
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
 * 更新SearchBar
 */
export function updateSearchBar(inputValue){
    return{
        type:INPUT_VALUE,
        inputValue
    }
}
