/**
 * Created by Tongming on 2016/12/26.
 */
import React, {PropTypes} from 'react';
import {connect} from 'react-redux'
import {fetchDataIfNeed, onLoop} from '../actions'
import Banner from '../components/Banner';
import ItemHead from '../components/ItemHead'
import ComicGrid from '../components/ComicGrid'
import Loading from '../components/Loading'
import BaseView from './BaseView';
import {HOME} from '../constants/Const'
require('../css/Home.css');
// import {Link} from 'react-router';

class Home extends BaseView {

	constructor(props) {
		super(props);
		this.test = 'test';
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

	componentWillUnmount() {
		this.props.dispatch(onLoop(0));
	}

	render() {
		const {data, status, currentIndex} = this.props;
		console.log('render index = ' + currentIndex);
		let banner = data !== undefined ? data.banner : [];
		let result = data !== undefined ? data.result : {};
		return (
			<div>
				<div style={{visibility: status === 1 ? "visible" : "hidden"}}>
					<Banner dispatch={this.props.dispatch} currentIndex={currentIndex} onLoop={this.onLoop}
					        imgs={banner}/>
					<ItemHead title="热门连载" index="0"/>
					<ComicGrid comics={result.hot}/>
					<ItemHead title="精彩推荐" index="1"/>
					<ComicGrid comics={result.recommend}/>
					<ItemHead title="精选国漫" index="2"/>
					<ComicGrid comics={result.local}/>
					<ItemHead title="最新上架" index="3"/>
					<ComicGrid comics={result.release}/>
					<div className="space"></div>
				</div>
				<Loading status={status}/>
			</div>
		)
	}
}

Home.propTypes = {
	data: PropTypes.object.isRequired,
	status: PropTypes.number,
	currentIndex: PropTypes.number,
};

function mapStateToProps(state) {
	return {
		data: state.homeReducer.data,
		status: state.homeReducer.status,
		currentIndex: state.homeReducer.currentIndex,
	}
}

export default connect(mapStateToProps)(Home);
