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
import {DETAIL,COLLECT,DISCOLLECT} from '../constants/Const'
import {connect} from 'react-redux'
import {fetchDataIfNeed, recordLocation, updateOpacity,updateHistoryChapter} from '../actions'
import {getDocumentTop,getCookies} from '../utils'
import {recordHistoryComic,selectHistory,openSQLHelper,HISTORY_CHAPTER_TABLE} from '../db/DBManager'
require('../css/Detail.less');

class Detail extends BaseView {

	constructor(props) {
		super(props);
		this.isInit = false;
		this.kind = DETAIL;
	}

	componentDidMount() {
		super.componentDidMount();
		this.initView(this.props);
		this.updateBtn();
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
		this.initView(nextProps)
	}

	componentWillUnmount() {
		super.componentWillUnmount();
		// this.props.dispatch(recordLocation(getDocumentTop(), DETAIL));
		window.onscroll = null;
	}

	initView(props) {
		if (props.status === 1&&!this.isInit) {
			document.body.scrollTop = props.localTop;
			recordHistoryComic(props.data);				
			this.isInit = true;
		}
	}


	getData() {
		this.comicUrl = this.props.location.query.comic_url;
		if (this.comicUrl === undefined) {
			browserHistory.push('/');
		} else {
			const {dispatch}  = this.props;
			dispatch(fetchDataIfNeed({
				method: 'GET',
				path: '/cc/comic/detail',
				category: DETAIL,
				query: {comic_url: this.comicUrl}
			},{
				method:'GET',
				path:'/collection',
				category:DETAIL,
				query:{uid:getCookies('uid'),name:this.props.location.query.comic_name}
			}));
			//查询历史记录
			selectHistory(openSQLHelper(),HISTORY_CHAPTER_TABLE,this.comicUrl,(result)=>{
				//不能直接使用result.rows[i]
				let historyUrl = result.rows.length>0?result.rows.item(0).chapter_url:'';
				this.props.dispatch(updateHistoryChapter(historyUrl));
			})
		}
	}

	componentDidUpdate(){
		super.componentDidUpdate();
		this.updateBtn();
	}

	updateBtn(){
		if(this.props.status===1){
			let btnRead = document.getElementById('btn-read');
			if(btnRead!==null&&this.props.historyUrl!==''){
				btnRead.innerText = '继续阅读'
			}
			let btnCollect = document.getElementById('btn-collect');
			if(this.props.isCollected){
				btnCollect.innerText = '已收藏'
				btnCollect.style.background = 'gray'
			}else{
				btnCollect.innerText = '收藏'
				btnCollect.style.background = '#ff960c'
			}
		}
	}

	startRead() {
		browserHistory.push('/manga/page?chapter_url=' +
			(this.props.historyUrl!==''?this.props.historyUrl:(this.props.data !== undefined ?
		this.props.data.chapter_list[this.props.data.chapter_list.length - 1].chapter_url : '')))
	}

	collectComic() {
		let token = getCookies('token')
		if(token!==''){
			const {comic_name,comic_author,comic_source,comic_area,comic_type,
				comic_url,status,cover} = this.props.data;
			if(!this.props.isCollected){
				this.props.dispatch(fetchDataIfNeed({
					path:'/collection',
					method:'POST',
					category:COLLECT,
					query:{
						token:token,
						name:comic_name,
						author:comic_author,
						comic_source:comic_source,
						area:comic_area.trim(),
						category:comic_type,
						url:comic_url,
						status:new RegExp('连载').exec(status).length>0?0:1,
						cover:cover,
						last_time:new Date().getTime()
					}
				}))
			}else{
				this.props.dispatch(fetchDataIfNeed({
					path:'/collection',
					method:'DELETE',
					category:DISCOLLECT,
					query:{
						token:token,
						name:comic_name,
					}
				}))
			}
			// alert('collect');
		}else{
			alert('请先登录')
		}
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
							<div className='cover'
								 style={{
									 background:`url(${(data.cover == '' ? require('../images/load_error.png') : data.cover)}) 0% 0% / cover`
								 }}/>
							<div className="info-r">
								<h1 className="info-title">{data.comic_name}</h1>
								<span className="span-author">作者：{data.comic_author}</span>
								<span>状态：{data.status}</span>
								<span>地区：{data.comic_area}</span>
								<Button id="btn-read" radius='8rem' width='7.2rem' height='3rem'
										margin='4% 2% 0 2%'
										onClick={this.startRead.bind(this)}
								        text="开始阅读"/>
								<Button id="btn-collect" radius='8rem' width='7.2rem' height='3rem'
										margin='4% 2% 0 2%'
										onClick={this.collectComic.bind(this)} text="收藏"/>
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
						<ChapterGrid historyUrl={this.props.historyUrl} chapterList={data.chapter_list}/>
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
	historyUrl:PropTypes.string.isRequired,
	isCollected:PropTypes.bool.isRequired,
}

function mapStateToProps(state) {
	return {
		data: state.detailReducer.data,
		status: state.detailReducer.status,
		localTop: state.detailReducer.localTop,
		opacity: state.detailReducer.opacity,
		historyUrl:state.detailReducer.historyUrl,
		isCollected:state.detailReducer.isCollected,
	}
}

export default connect(mapStateToProps)(Detail);