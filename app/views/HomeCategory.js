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
import {fetchDataIfNeed, recordLocation,updateSearchBar} from '../actions'

class HomeCategory extends BaseView {

	constructor(props) {
		super(props);
	}

	componentWillUnmount(){
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
		// ev.props.dispatch(updateSearchBar(word));
		let url = '/manga/search?word=' + word;
		browserHistory.push(url);
	}

	handleChange(ev,word){
		ev.props.dispatch(updateSearchBar(word));
	}

	render() {
		const {category, status} = this.props;
		return (
			<div>
				<SearchBar handleChange={this.handleChange} dispatch={this.props.dispatch} value={this.props.inputValue}  doSearch={this.handleSearch}/>
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
	inputValue: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
	return {
		category: state.categoryReducer.category,
		status: state.categoryReducer.status,
		localTop: state.categoryReducer.localTop,
		inputValue:state.categoryReducer.inputValue,
	}
}

export default connect(mapStateToProps)(HomeCategory);
