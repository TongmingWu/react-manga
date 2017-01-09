import 'core-js/fn/object/assign';
import React from 'react';
import App from './views/App';
import {Router, Route, IndexRoute, browserHistory, Redirect} from 'react-router'
import {render} from 'react-dom'
require('./index.css');

//路由表
//按需加载
render((
	<Router history={browserHistory}>
		<Route path="/" component={App}>
			<IndexRoute getComponent={ (nextState, callback) => {
				require.ensure([], (require) => {
					callback(null, require("./views/Home").default)
				})
			} }/>

			<Route path="home" getComponent={ (nextState, callback) => {
				require.ensure([], (require) => {
					callback(null, require("./views/Home").default)
				})
			} }>
				<IndexRoute getComponent={ (nextState, callback) => {
					require.ensure([], (require) => {
						callback(null, require("./views/HomeMain").default)
					})
				} }/>
				<Route path="main" getComponent={ (nextState, callback) => {
					require.ensure([], (require) => {
						callback(null, require("./views/HomeMain").default)
					})
				} }/>

				<Route path="collection" getComponent={ (nextState, callback) => {
					require.ensure([], (require) => {
						callback(null, require("./views/HomeCollection").default)
					})
				} }/>

				<Route path="category" getComponent={ (nextState, callback) => {
					require.ensure([], (require) => {
						callback(null, require("./views/HomeSearch").default)
					})
				} }/>
			</Route>

			<Route path="detail" getComponent={ (nextState, callback) => {
				require.ensure([], (require) => {
					callback(null, require("./views/Detail").default)
				})
			} }/>

			<Route path="page" getComponent={ (nextState, callback) => {
				require.ensure([], (require) => {
					callback(null, require("./views/Page").default)
				})
			} }/>

			<Route path="category/:title/:cid" getComponent={ (nextState, callback) => {
				require.ensure([], (require) => {
					callback(null, require("./views/Category").default)
				})
			} }/>

			<Route path="search" getComponent={ (nextState, callback) => {
				require.ensure([], (require) => {
					callback(null, require("./views/Category").default)
				})
			} }/>
		</Route>
	</Router>
), document.getElementById('app'));
