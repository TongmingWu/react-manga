/**
 * Created by Tongming on 2017/1/4.
 */
import React from 'react'
import api from '../apis'
import ComicGrid from '../components/ComicGrid'
import Toolbar from '../components/Toolbar'
import Loading from '../components/Loading'
import {readUTF} from '../utils'
require('../css/Category.css');

export default class Category extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			title: '',
			comics: [],
			page: 1,
			status: 0,
			isCompleted: false,
			next: true
		};
		this.isLoading = false;
		this.path = '';
		this.query = '';
		this.title = '';
		this.type = 0;
		window.onscroll = () => {
			if (this.getScrollHeight() === this.getWindowHeight() + this.getDocumentTop()) {
				this.loadMore();
			}
		}
	}

	componentWillMount() {
		if (this.props.location.query.word === undefined) {
			this.title = readUTF(new RegExp('/category/(.*)/').exec(window.location.pathname)[1]);
			this.type = new RegExp('/(\\d+)').exec(window.location.pathname)[0].replace('/', '');
			this.query = {
				type: this.type,
				page: this.state.page
			};
			this.path = '/cc/comic/category';
		} else {
			this.title = '搜索：' + this.props.location.query.word;
			this.path = '/cc/search';
			this.query = {
				word: this.title,
				page: this.state.page
			}
		}
		this.getData();
	}

	getData() {
		this.isLoading = true;
		api({
			path: this.path,
			method: 'GET',
			query: this.query,
			onSuccess: (json) => {
				this.setState({
					title: this.title,
					status: 1,
					isCompleted: true,
					comics: this.state.comics.concat(json.result),
					page: json.current_page + 1,
					next: json.next,
				});
				this.isLoading = false;
			},
			onFail: (error) => {
				console.log(error);
				this.setState({
					status: -1,
				});
				this.isLoading = false;
			}
		})
	}

	loadMore() {
		if (!this.state.next) {
			alert('下面没有咯。');
			return;
		}
		if (this.isLoading) {
			return;
		}
		this.query.page = this.state.page;
		console.log(this.query);
		this.getData();
	}

	//离最顶部的高度
	getDocumentTop() {
		let scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
		if (document.body) {
			bodyScrollTop = document.body.scrollTop;
		}
		if (document.documentElement) {
			documentScrollTop = document.documentElement.scrollTop;
		}
		scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
		return scrollTop;
	}

	//可视窗口高度
	getWindowHeight() {
		let windowHeight = 0;
		if (document.compatMode == "CSS1Compat") {
			windowHeight = document.documentElement.clientHeight;
		} else {
			windowHeight = document.body.clientHeight;
		}
		return windowHeight;
	}

	//滚动条滚动高度
	getScrollHeight() {
		let scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
		if (document.body) {
			bodyScrollHeight = document.body.scrollHeight;
		}
		if (document.documentElement) {
			documentScrollHeight = document.documentElement.scrollHeight;
		}
		scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
		return scrollHeight;
	}


	render() {
		return (
			<div>
				<Toolbar title={this.state.title}/>
				<ComicGrid comics={this.state.comics}/>
				<Loading status={this.state.status} shown={this.state.isCompleted}/>
			</div>
		)
	}
}