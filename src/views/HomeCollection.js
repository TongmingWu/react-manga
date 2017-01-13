/**
 * Created by Tongming on 2016/12/26.
 */
import React from 'react';
import BaseView from './BaseView'
import api from '../apis'
import ComicGrid from '../components/ComicGrid'
import Loading from '../components/Loading'
require('../css/Home.css');
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
		// api({
		// 	path: '/cc/',
		// 	method: 'GET',
		// 	onSuccess: (json) => {
		// 		if (!this.isUnmount) {
		//
		// 		}
		// 	},
		// 	onFail: (error) => {
		// 		console.log(error);
		//
		// 	}
		// })
		console.log('getData');
		let url = 'http://images.dmzj.com/webpic/13/fatestaynightheavenV3.jpg';
		let mHeaders = new Headers({
			'Access-Control-Allow-Origin': '*'
		});
		//无法修改Referer
		let mInit = {
			method: 'GET',
			referrer:'http://m.dmzj.com',
			headers: mHeaders,
			mode: 'cors',
			cache: 'default'
		};
		fetch(url, mInit)
			.then((res) => {
				console.log('加载图片成功');
				let objectURL = URL.createObjectURL(res);
				document.getElementsByClassName('test')[0].src = objectURL;
			}).catch((error) => {
			console.log(error);
		})
	}

	routerWillLeave() {
		console.log('routerWillLeave');
	}

	render() {
		return (
			<div>
				<img className="test" alt="test"/>
				<Loading status={this.state.status} shown={this.state.isCompleted}/>
			</div>
		)
	}
}

export default HomeCollection;
