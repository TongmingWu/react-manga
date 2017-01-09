/**
 * Created by Tongming on 2017/1/3.
 */
import React from 'react';
require('../css/SearchBar.css');

export default class SearchBar extends React.Component {
	constructor(props) {
		super(props);
	}

	innerSearch(ev) {
		if (ev.target.className === 'ic-search') {
			let search = document.getElementById('search');
			if (search.value.trim() != '') {
				this.props.doSearch(this, search.value);
			}
		} else {
			if (ev.keyCode === 13 && ev.target.value.trim() != '') {
				this.props.doSearch(this, ev.target.value)
			}
		}
	}

	render() {
		return (
			<div className="search">
				<input onKeyDown={this.innerSearch.bind(this)} id="search" placeholder="请输入关键词" className="search-i"
				       type="text"/>
				<img onClick={this.innerSearch.bind(this)} className="ic-search"
				     src={require('../images/ic_search_m.png')}
				     alt="search"/>
			</div>
		)
	}
}