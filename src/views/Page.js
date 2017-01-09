/**
 * Created by Tongming on 2017/1/1.
 */
import React from 'react';
import api from '../apis'
import {browserHistory, Link} from 'react-router'
import Loading from '../components/Loading'
// import LazyLoad from 'react-lazy-load'
require('../css/Page.css');

export default class Page extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			imgs: [],
			title: '',
			total: 0,
			currentIndex: 0,
			shown: true,
			preUrl: '',
			nextUrl: '',
			isCompleted: false,
			next: true,
			prepare: true,
			status: 0,
			// isInit: false,
		};
		this.isInit = false;
		this.width = window.screen.width;
		this.height = window.screen.height;
	}

	componentWillMount() {
		this.chapterUrl = this.props.location.query.chapter_url;
		if (this.chapterUrl === undefined) {
			browserHistory.push('/');
		} else {
			this.getData();
		}
	}

	componentDidMount() {
		window.onscroll = () => {
			let pages = document.getElementsByClassName('page-i');
			let currentIndex = 0;
			for (let index = 0; index < pages.length; index++) {
				if (pages[index].getBoundingClientRect().top < window.innerHeight) {
					currentIndex = index;
				}
			}
			this.setState({currentIndex: currentIndex});
		}
	}

	getData() {
		this.setState({
			imgs: [],
			isCompleted: false,
			status: 0,
			shown: false,
			// isInit: false,
		});
		this.isInit = false;
		api({
			path: '/cc/comic/view',
			method: 'GET',
			query: {
				chapter_url: this.chapterUrl
			},
			onSuccess: (json) => {
				if (json.code === 200) {
					this.setState({
						imgs: json.img_list,
						title: json.chapter_name,
						total: json.img_list.length,
						preUrl: json.pre_chapter_url,
						nextUrl: json.next_chapter_url,
						isCompleted: true,
						next: json.next,
						prepare: json.prepare,
						status: 1,
					});
					//换章节时跳到顶部
					document.body.scrollTop = 0;
				} else {
					console.log(json.message);
					alert('因版权问题无法观看2333');
					browserHistory.goBack();
				}
			},
			onFail: (error) => {
				console.log(error);
				this.setState({
					status: -1
				})
			}
		})
	}

	componentDidUpdate() {
		this.initWH();
	}

	handleController(ev) {
		if (Math.abs(ev.clientX - this.width / 2) < this.width / 3
			&& Math.abs(ev.clientY - this.height / 2) < this.height / 4) {
			this.setState({
				shown: !this.state.shown
			})
		}
	}

	hideController() {
		if (this.state.shown) {
			this.setState({shown: false});
		}
	}

	loadChapter(ev) {
		if (ev.target.className === 'pre-ch btn-ch' && !this.state.prepare) {
			alert('这是第一话哦 - -');
			return;
		} else if (ev.target.className === 'next-ch btn-ch' && !this.state.next) {
			alert('后面没有咯 - -');
			return;
		}
		this.chapterUrl = ev.target.childNodes.item(0).textContent;
		this.getData();
	}

	initWH() {
		if (this.isInit) {
			return;
		}
		let imgs = document.getElementsByClassName('page-i');
		if (imgs.length > 0) {
			/*for (let img of imgs) {
			 img.style.width = this.width / 12 + 'rem';
			 }*/
			for (let i = 0; i < imgs.length; i++) {
				imgs[i].style.width = this.width + 'px';
			}
			this.isInit = true;
		}
	}

	render() {
		//点击屏幕中间,弹出选项板,选项板包括的内容(
		//  top:后退键 标题
		//  bottom: 进度条 章节控制
		// )
		return (
			<div onClick={this.handleController.bind(this)} className="con-page">
				<div className={this.state.shown ? 'page-top shown' : 'page-top'}>
					<img className="back" onTouchStart={browserHistory.goBack}
					     src={require('../images/abc_ic_ab_back_mtrl_am_alpha.png')}/>
					<span
						className="chapter-name">{this.state.title + '  ' + (this.state.currentIndex + 1) + '/' + this.state.total}</span>
				</div>
				<div onTouchMove={this.hideController.bind(this)} className="page-content">
					{
						this.state.imgs.map((item) => {
							return <img className="page-i" src={item}/>
						})
					}
				</div>
				<Loading shown={this.state.isCompleted} status={this.state.status}/>
				<div className={this.state.shown ? 'page-bottom shown' : 'page-bottom'}>
					<div className="page-bottom-inner">
						<progress className="progress" value={this.state.currentIndex + 1} max={this.state.total}>
							我是进度条- -
						</progress>
						<div onTouchStart={this.loadChapter.bind(this)}
						     className="pre-ch btn-ch"><span>{this.state.preUrl}</span></div>
						<div onTouchStart={this.loadChapter.bind(this)}
						     className="next-ch btn-ch"><span>{this.state.nextUrl}</span></div>
					</div>
				</div>
			</div>
		)
	}
}