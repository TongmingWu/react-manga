/**
 * Created by Tongming on 2016/12/26.
 */
import React, {PropTypes} from 'react';
import BaseView from './BaseView';
import api from '../apis'
import Loading from '../components/Loading'
import {browserHistory} from 'react-router';
import SearchBar from '../components/SearchBar'
import CategoryGrid from '../components/CategoryGrid'
import {CATEGORY} from '../constants/Const'
import {connect} from 'react-redux'
import {fetchDataIfNeed} from '../actions'


class HomeCategory extends BaseView {

	constructor(props) {
		super(props);
	}

	getData() {
		const {dispatch}  = this.props;
		dispatch(fetchDataIfNeed({
			method: 'GET',
			path: '/comic/category',
			query: {source: 'cc'},
			category: CATEGORY
		}))
	}

	handleSearch(ev, word) {
		console.log(word);
		let url = '/search?word=' + word;
		browserHistory.push(url);
	}

	render() {
		const {category, status} = this.props;
		return (
			<div>
				<SearchBar doSearch={this.handleSearch}/>
				<CategoryGrid list={category}/>
				<Loading status={status}/>
			</div>
		)
	}
}

HomeCategory.propTypes = {
	data: PropTypes.object.isRequired,
	status: PropTypes.number
};

function mapStateToProps(state) {
	return {
		category: state.categoryReducer.category,
		status: state.categoryReducer.status
	}
}

export default connect(mapStateToProps)(HomeCategory);
