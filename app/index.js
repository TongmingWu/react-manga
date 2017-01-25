import 'core-js/fn/object/assign';
import React from 'react';
import App from './views/App';
import {Router, Route, IndexRoute, browserHistory} from 'react-router'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import configStore from './store/ConfigStore'
import {openSQLHelper} from './db/DBManager'
require('./index.less');

const store = configStore();

const home = (location, callback) => {
	require.ensure([], require => {
		callback(null, require('./views/Home').default)
	}, 'Home')
};

const homeMain = (location, callback) => {
	require.ensure([], (require) => {
		callback(null, require("./views/HomeMain").default)
	}, 'HomeMain')
};

const homeCollection = (location, callback) => {
	require.ensure([], (require) => {
		callback(null, require("./views/HomeCollection").default)
	}, 'HomeCollection')
};

const homeCategory = (location, callback) => {
	require.ensure([], (require) => {
		callback(null, require("./views/HomeCategory").default)
	}, 'HomeCategory')
};

const detail = (location, callback) => {
	require.ensure([], (require) => {
		callback(null, require("./views/Detail").default)
	}, 'Detail')
};

const page = (location, callback) => {
	require.ensure([], (require) => {
		callback(null, require("./views/Page").default)
	}, 'Page')
};

const search = (location, callback) => {
	require.ensure([], (require) => {
		callback(null, require("./views/Search").default)
	}, 'Search')
};

const history = (location, callback) => {
	require.ensure([], (require) => {
		callback(null, require("./views/History").default)
	}, 'History')
}

const login = (location, callback) => {
	require.ensure([], (require) => {
		callback(null, require("./views/Login").default)
	}, 'Login')
}

const logon = (location, callback) => {
	require.ensure([], (require) => {
		callback(null, require("./views/Logon").default)
	}, 'Logon')
}

//路由表
//按需加载
render((
	<Provider store={store}>
		<Router history={browserHistory}>
			<Route path="/" component={App}>
				<IndexRoute getComponent={home}/>
				<Route path="manga/home" getComponent={home}>
					<IndexRoute getComponent={homeMain}/>
					<Route path="main" getComponent={homeMain}/>

					<Route path="collection" getComponent={homeCollection}/>

					<Route path="category" getComponent={homeCategory}/>
				</Route>

				<Route path="manga/detail" getComponent={detail}/>

				<Route path="manga/page" getComponent={page}/>

				<Route path="manga/category/:title/:cid" getComponent={search}/>

				<Route path="manga/search" getComponent={search}/>

				<Route path='manga/history' getComponent={history}/>

				<Route path='manga/login' getComponent={login}/>

				<Route path='manga/logon' getComponent={logon}/>
			</Route>
		</Router>
	</Provider>
), document.getElementById('app'));
