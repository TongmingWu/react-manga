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
import {fetchDataIfNeed, recordLocation} from '../actions'
import {getDocumentTop} from '../utils'
require('../css/Detail.less');

class Detail extends BaseView {

	constructor(props) {
		super(props);
	}

	componentDidMount() {
		super.componentDidMount();
		this.changeTop(this.props)
	}

	componentWillReceiveProps(nextProps) {
		this.changeTop(nextProps)
	}

	componentWillUnmount() {
		super.componentWillUnmount();
		this.props.dispatch(recordLocation(getDocumentTop(), DETAIL))
	}

	changeTop(props) {
		if (props.status === 1) {
			document.body.scrollTop = props.localTop;
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
		browserHistory.push('/page?chapter_url=' +
			(this.props.data !== undefined ?
				this.props.data.chapter_list[this.props.data.chapter_list.length - 1].chapter_url : ''))
	}

	collectComic() {
		console.log('collect');
	}

	render() {
		const {data, status} = this.props;
		//限定字数为72
		return (
			<div>
				<Toolbar title={data !== undefined ? (status === 1 ? data.comic_name : '') : ''}/>
				{data !== undefined ?
					<div style={{visibility: status === 1 ? "visible" : "hidden"}} className="con-info">
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
};

function mapStateToProps(state) {
	// console.log(state.detailReducer);
	return {
		data: state.detailReducer.data,
		status: state.detailReducer.status,
		localTop: state.detailReducer.localTop,
	}
}

export default connect(mapStateToProps)(Detail);