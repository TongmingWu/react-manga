/**
 * Created by Tongming on 2017/1/12.
 */
import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers'

const createStoreWithMiddleware = applyMiddleware(
	thunk,
)(createStore);

export default function (initialState) {
	let store = null;
	if (module.hot) {
		store = createStoreWithMiddleware(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
	}else{
		store = createStoreWithMiddleware(rootReducer);
	}
	return store;
}