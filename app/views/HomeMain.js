/**
 * Created by Tongming on 2016/12/26.
 */
import React, {PropTypes} from 'react';
import {connect} from 'react-redux'
import {fetchDataIfNeed, onLoop, recordLocation, initImage} from '../actions'
import Banner from '../components/Banner';
import ItemHead from '../components/ItemHead'
import ComicGrid from '../components/ComicGrid'
import Loading from '../components/Loading'
import BaseView from './BaseView';
import {HOME} from '../constants/Const'
import {getDocumentTop, getScreenWidth} from '../utils'
require('../css/Home.less');
// import {Link} from 'react-router';

class HomeMain extends BaseView {

	constructor(props) {
		super(props);
		this.kind = HOME;
	}

	getData() {
		const {dispatch}  = this.props;
		dispatch(fetchDataIfNeed({
			method: 'GET',
			path: '/cc/',
			category: HOME
		}))
	}

	onLoop(currentIndex, dispatch) {
		dispatch(onLoop(currentIndex));
	}

	componentWillUnmount(){
		super.componentWillUnmount();
		this.props.dispatch(onLoop(0));
		//记录滚动条的位置
		let localTop = getDocumentTop();
		this.props.dispatch(recordLocation(localTop, HOME));
		this.props.dispatch(initImage(false, HOME));
	}

	initCover() {
		if(!this.props.isInit||this.isChange){
			let covers = document.getElementsByClassName('cover');
			if (covers.length > 0) {
				let width = getScreenWidth();
				let length = covers.length;
				let scale = 0.303333333;
				for (let i = 0; i < length; i++) {
					covers[i].style.width = (width * scale) + 'px';
					covers[i].style.height = (width * scale * 1.4) + 'px';
				}
				this.props.dispatch(initImage(true, HOME));
			}
		}
	}

	render() {
		const {data, status, currentIndex, isInit} = this.props;
		let banner = data !== undefined ? data.banner : [];
		let result = data !== undefined ? data.result : {};
		return (
			<div>
				<div style={{visibility: status === 1 ? "visible" : "hidden"}}>
					<Banner isChange={this.isChange} isInit={isInit} dispatch={this.props.dispatch} currentIndex={currentIndex}
					        onLoop={this.onLoop}
					        imgs={banner}/>
					<ItemHead url='/manga/category/热门连载/107' title="热门连载" index="0"/>
					<ComicGrid comics={result.hot}/>
					<ItemHead url='/manga/category/排行榜/108' title="精彩推荐" index="1"/>
					<ComicGrid comics={result.recommend}/>
					<ItemHead url='/manga/category/国漫/106' title="精选国漫" index="2"/>
					<ComicGrid comics={result.local}/>
					<ItemHead url='/manga/category/最近更新/109' title="最新上架" index="3"/>
					<ComicGrid comics={result.release}/>
					<div className="space"></div>
				</div>
				<Loading status={status}/>
			</div>
		)
	}
}

HomeMain.propTypes = {
	data: PropTypes.object.isRequired,
	status: PropTypes.number,
	currentIndex: PropTypes.number,
	localTop: PropTypes.number,
	isInit: PropTypes.bool,
};

HomeMain.defaultProps = {
	status:0,
	currentIndex:0,
	localTop:0,
	isInit:false,
}

function mapStateToProps(state) {
	return {
		data: state.homeReducer.data,
		status: state.homeReducer.status,
		currentIndex: state.homeReducer.currentIndex,
		localTop: state.homeReducer.localTop,
		isInit: state.homeReducer.isInit,
	}
}

export default connect(mapStateToProps)(HomeMain);
