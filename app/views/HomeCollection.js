/**
 * Created by Tongming on 2016/12/26.
 */
import React from 'react';
import BaseView from './BaseView'
import ComicGrid from '../components/ComicGrid'
import Loading from '../components/Loading'
import {browserHistory} from 'react-router'
require('../css/Home.less');
// import {Link} from 'react-router';

class HomeCollection extends BaseView {
	constructor(props) {
		super(props);
		this.state = {
			status: 0,
			isCompleted: false,
		}
	}

	getData() {

	}

	render() {
		return (
			<div>
				<h2 style={{textAlign:'center'}}>收藏页面尚未完成</h2>
				<Loading status={this.state.status} shown={this.state.isCompleted}/>
			</div>
		)
	}
}

export default HomeCollection;
