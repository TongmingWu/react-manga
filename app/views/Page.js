/**
 * Created by Tongming on 2017/1/1.
 */
import React, {PropTypes} from 'react'
import BaseView from './BaseView'
import {browserHistory} from 'react-router'
import Loading from '../components/Loading'
import {PAGE} from '../constants/Const'
import {connect} from 'react-redux'
import {getScreenWidth, getScreenHeight} from '../utils'
import {fetchDataIfNeed, changePage, handleController} from '../actions'
require('../css/Page.less');

class Page extends BaseView {
	constructor(props) {
		super(props);
		this.width = getScreenWidth();
		this.height = getScreenHeight();
	}

	componentDidMount() {
		this.chapterUrl = this.props.location.query.chapter_url;
		if (this.chapterUrl === undefined) {
			browserHistory.push('/');
		} else {
			this.getData();
		}

		window.onscroll = () => {
			let pages = document.getElementsByClassName('page-i');
			let currentIndex = 0;
			for (let index = 0; index < pages.length; index++) {
				if (pages[index].getBoundingClientRect().top < window.innerHeight) {
					currentIndex = index;
				}
			}
			this.props.dispatch(changePage(currentIndex));
		};
	}

	componentWillUnmount() {
		window.onscroll = null;
		window.onorientationchange = null;
	}

	getData() {
		const {dispatch}  = this.props;
		this.isInit = false;
		dispatch(fetchDataIfNeed({
			method: 'GET',
			path: '/cc/comic/view',
			category: PAGE,
			query: {chapter_url: this.chapterUrl}
		}));
	}

	handleController(ev) {
		if (Math.abs(ev.clientX - this.width / 2) < this.width / 3
			&& Math.abs(ev.clientY - this.height / 2) < this.height / 4) {
			this.props.dispatch(handleController(!this.props.shown));
		}
	}

	hideController() {
		if (this.props.shown) {
			this.props.dispatch(handleController(false));
		}
	}

	loadChapter(ev) {
		if (ev.target.className === 'pre-ch btn-ch' && !this.props.prepare) {
			alert('这是第一话哦 - -');
			return;
		} else if (ev.target.className === 'next-ch btn-ch' && !this.props.next) {
			alert('后面没有咯 - -');
			return;
		}
		this.chapterUrl = ev.target.childNodes.item(0).textContent;
		this.getData();
		browserHistory.replace('/manga/page?chapter_url='+this.chapterUrl)
	}

	initWH() {
		if (this.props.status !== 1 || this.isInit) {
			return;
		}
		let imgs = document.getElementsByClassName('page-i');
		if (imgs.length > 0) {
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
		const {imgs, status, title, total, preUrl, nextUrl, currentIndex, shown} = this.props;
		return (
			<div onClick={this.handleController.bind(this)} className="con-page">
				<div className={shown ? 'page-top shown' : 'page-top'}>
					<div className='back-down'/>
					<img className="back" onClick={browserHistory.goBack}
					     src={require('../images/abc_ic_ab_back_mtrl_am_alpha.png')}/>
					<span
						className="chapter-name">{title + '  ' + (currentIndex + 1) + '/' + total}</span>
				</div>
				{
				<div onTouchMove={this.hideController.bind(this)} className="page-content">
					{
						imgs.map((item) => {
							return <img key={item} className="page-i" src={item}/>
						})
					}
				</div>
				}
				<Loading status={status}/>
				<div className={shown ? 'page-bottom shown' : 'page-bottom'}>
					<div className='back-down'/>
					<div className="page-bottom-inner">
						<progress className="progress" value={currentIndex + 1} max={total}>
							我是进度条- -
						</progress>
						<div onClick={this.loadChapter.bind(this)}
						     className="pre-ch btn-ch"><span>{preUrl}</span></div>
						<div onClick={this.loadChapter.bind(this)}
						     className="next-ch btn-ch"><span>{nextUrl}</span></div>
					</div>
				</div>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		imgs: state.pageReducer.imgs,
		status: state.pageReducer.status,
		title: state.pageReducer.title,
		total: state.pageReducer.total,
		preUrl: state.pageReducer.preUrl,
		nextUrl: state.pageReducer.nextUrl,
		next: state.pageReducer.next,
		prepare: state.pageReducer.prepare,
		currentIndex: state.pageReducer.currentIndex,
		shown: state.pageReducer.shown,
	}
}

Page.PropTypes = {
	imgs: PropTypes.array.isRequired,
	status: PropTypes.number,
	title: PropTypes.string.isRequired,
	total: PropTypes.number,
	preUrl: PropTypes.string.isRequired,
	nextUrl: PropTypes.string.isRequired,
	next: PropTypes.bool.isRequired,
	prepare: PropTypes.bool.isRequired,
	currentIndex: PropTypes.number,
	shown: PropTypes.bool.isRequired,
};

Page.defaultProps = {
	imgs: [],
	status: 0,
	title: '',
	total: 0,
	preUrl: '',
	nextUrl: '',
	next:false,
	prepare:false,
	currentIndex:0,
	shown:false,
}

export default connect(mapStateToProps)(Page);