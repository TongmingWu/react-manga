/**
 * Created by Tongming on 2017/1/4.
 */
import React, {PropTypes} from 'react'
import BaseView from './BaseView'
import ComicGrid from '../components/ComicGrid'
import Toolbar from '../components/Toolbar'
import Loading from '../components/Loading'
import {readUTF, getDocumentTop, getWindowHeight, getScrollHeight} from '../utils'
import {SEARCH} from '../constants/Const'
import {connect} from 'react-redux'
import {fetchDataIfNeed} from '../actions'
require('../css/Category.css');

class Search extends BaseView {
	constructor(props) {
		super(props);
		this.path = '';
		this.query = '';
		this.title = '';
		this.type = 0;
		window.onscroll = () => {
			if (this.props.status === 1 && getScrollHeight() <= getWindowHeight() + Math.round(getDocumentTop()) + 1) {
				this.loadMore();
			}
		}
	}

	componentDidMount() {
		let location = this.props.location;
		if (location.query.word === undefined) {
			this.title = readUTF(new RegExp('/category/(.*)/').exec(window.location.pathname)[1]);
			this.type = new RegExp('/(\\d+)').exec(window.location.pathname)[0].replace('/', '');
			this.query = {
				type: this.type,
				page: location.query.page === undefined ?
					this.props.page : location.query.page,
			};
			this.path = '/cc/comic/category';
		} else {
			this.title = '搜索：' + this.props.location.query.word;
			this.path = '/cc/search';
			this.query = {
				word: this.title,
				page: location.query.page === undefined ?
					this.props.page : location.query.page,
			}
		}
		this.getData();
	}

	getData() {
		this.props.dispatch(fetchDataIfNeed({
			query: this.query,
			path: this.path,
			method: 'GET',
			category: SEARCH,
		}));
	}

	loadMore() {
		if (!this.props.next) {
			alert('下面没有咯。');
			return;
		}
		if (this.props.status === 0) {
			return;
		}
		this.query.page = this.props.page + 1;
		this.getData();
	}

	render() {
		const {status, items} = this.props;
		return (
			<div>
				<Toolbar title={this.title}/>
				<div style={{paddingTop:'4rem'}}></div>
				<ComicGrid comics={items}/>
				<Loading status={status}/>
			</div>
		)
	}
}

Search.PropTypes = {
	items: PropTypes.array.isRequired,
	title: PropTypes.string.isRequired,
	page: PropTypes.number,
	status: PropTypes.number,
	next: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
	return {
		items: state.searchReducer.items,
		title: state.searchReducer.title,
		page: state.searchReducer.page,
		status: state.searchReducer.status,
		next: state.searchReducer.next,
	}
}

export default connect(mapStateToProps)(Search)