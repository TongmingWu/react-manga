/**
 * Created by Tongming on 2016/12/26.
 */
import React, {PropTypes} from 'react';
import {browserHistory} from 'react-router';
import Toolbar from '../components/Toolbar'
import Button from '../components/Button'
import ChapterGrid from '../components/ChapterGrid'
import Loading from '../components/Loading'
import BaseView from './BaseView';
import {DETAIL} from '../constants/Const'
import {connect} from 'react-redux'
import {fetchDataIfNeed, recordLocation, updateOpacity} from '../actions'
import {getDocumentTop} from '../utils'
require('../css/Detail.less');

class Detail extends BaseView {

	constructor(props) {
		super(props);
		this.isInit = false;
	}

	componentDidMount() {
		super.componentDidMount();
		this.changeTop(this.props);
		window.onscroll = ()=>{
			if(this.props.opacity===1&&top>200){
				return;
			}
			let top = getDocumentTop();		
			if(top/200<1){
				this.props.dispatch(updateOpacity(top/200))
			}else if(top>200){
				this.props.dispatch(updateOpacity(1))
			}
		}
	}

	componentWillReceiveProps(nextProps) {
		this.changeTop(nextProps)
	}

	componentWillUnmount() {
		super.componentWillUnmount();
		this.props.dispatch(recordLocation(getDocumentTop(), DETAIL));
		window.onscroll = null;
	}

	changeTop(props) {
		if (props.status === 1&&!this.isInit) {
			document.body.scrollTop = props.localTop;
			this.isInit = true;
		}
	}


	getData() {
		this.comicUrl = this.props.location.query.comic_url;
		if (this.comicUrl === undefined) {
			browserHistory.push('/');
		} else {
			console.log('comicUrl = ' + this.comicUrl);
			const {dispatch}  = this.props;
			dispatch(fetchDataIfNeed({
				method: 'GET',
				path: '/cc/comic/detail',
				category: DETAIL,
				query: {comic_url: this.comicUrl}
			}));
		}
	}

	startRead() {
		browserHistory.push('/manga/page?chapter_url=' +
			(this.props.data !== undefined ?
				this.props.data.chapter_list[this.props.data.chapter_list.length - 1].chapter_url : ''))
	}

	collectComic() {
		console.log('collect');
	}

	render() {
		const {data, status} = this.props;
		return (
			<div>
				<Toolbar opacity={this.props.opacity}  title={data !== undefined ? (status === 1 ? data.comic_name : '') : ''}/>
				{data !== undefined ?
					<div style={{visibility: status === 1 ? "visible" : "hidden"}} className="con-info">
						<div className='blur-cover' style={{
								background:`url(${data!==undefined?data.cover:''})`,
								backgroundSize:'cover',
							}}/>
						<div className="info-top">
							<img className="cover"
							     src={data.cover == '' ? require('../images/load_error.png') : data.cover}
							     alt={data.comic_name}/>
							<div className="info-r">
								<h1 className="info-title">{data.comic_name}</h1>
								<span className="span-author">作者：{data.comic_author}</span>
								<span>状态：{data.status}</span>
								<span>地区：{data.comic_area}</span>
								<Button clickEvent={this.startRead.bind(this)}
								        text="开始阅读"/>
								<Button clickEvent={this.collectComic.bind(this)} text="收藏"/>
							</div>
						</div>
						<div className="cl-desc">
							<p className="desc">{data !== undefined ? data.desc.substring(0, 64) + '......' : ''}</p>
						</div>
						<div>
						<span className="chapter-span chapter-span-l">共{data.chapter_list === undefined ? 0 :
							data.chapter_list.length}话</span>
							<span
								className="chapter-span chapter-span-r">
							更新于{data.newest_chapter_date === undefined ? '' : data.newest_chapter_date.split(' ')[0]}
							</span>
						</div>
						<ChapterGrid chapterList={data.chapter_list}/>
					</div> : <div></div>
				}
				<Loading status={status}/>
			</div>
		)
	}
}

Detail.propTypes = {
	data: PropTypes.object.isRequired,
	status: PropTypes.number,
	localTop: PropTypes.number,
	opacity:PropTypes.number,
};

function mapStateToProps(state) {
	// console.log(state.detailReducer);
	return {
		data: state.detailReducer.data,
		status: state.detailReducer.status,
		localTop: state.detailReducer.localTop,
		opacity: state.detailReducer.opacity,
	}
}

export default connect(mapStateToProps)(Detail);