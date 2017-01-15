/**
 * Created by Tongming on 2016/12/26.
 */
import React, {PropTypes} from 'react';
import BaseView from './BaseView';
import Loading from '../components/Loading'
import {browserHistory} from 'react-router';
import SearchBar from '../components/SearchBar'
import CategoryGrid from '../components/CategoryGrid'
import {CATEGORY} from '../constants/Const'
import {connect} from 'react-redux'
import {getDocumentTop} from '../utils'
import {fetchDataIfNeed, recordLocation} from '../actions'

class HomeCategory extends BaseView {

	constructor(props) {
		super(props);
	}

	componentDidMount() {
		super.componentDidMount();
		if (this.props.status === 1) {
			document.body.scrollTop = this.props.localTop;
		}
	}

	componentWillUnmount() {
		super.componentWillUnmount();
		this.props.dispatch(recordLocation(getDocumentTop(), CATEGORY));
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
	status: PropTypes.number,
	localTop: PropTypes.number,
};

function mapStateToProps(state) {
	return {
		category: state.categoryReducer.category,
		status: state.categoryReducer.status,
		localTop: state.categoryReducer.localTop,
	}
}

export default connect(mapStateToProps)(HomeCategory);
