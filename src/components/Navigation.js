/**
 * Created by Tongming on 2016/12/26.
 */
require('../css/Navigation.css');
import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router'

class Navigation extends Component {

	constructor(props) {
		super(props);
		this.col = require("../images/icon_tab_favor_us.png");
		this.main = require("../images/icon_tab_recom_us.png");
		this.search = require("../images/icon_tab_search_us.png");
		this.init();
	}

	render() {
		return (
			<div className="nav">
				<div className="cl-nav">
					<img className="nav-i" src={require('../images/icon_tab_more.png')} alt="nav"/>
					<img className="avatar" src={require('../images/default_avatar.png')}/>
				</div>
				<div className="cl-tab">
					<Link to="/home/collection">
						<img className="tab-item" src={this.col}/>
					</Link>
					<Link to="/home/main">
						<img className="tab-item" src={this.main}/>
					</Link>
					<Link to="/home/category">
						<img className="tab-item" src={this.search}/>
					</Link>
				</div>
			</div>
		)
	}

	init() {
		//设置图标
		let reg = new RegExp('/home/(.*)').exec(window.location.href);
		switch (reg == null || undefined ? 'main' : reg[1]) {
			case 'collection':
				this.col = require("../images/icon_tab_favor.png");
				break;
			case 'main':
				this.main = require("../images/icon_tab_recom.png");
				break;
			case 'category':
				this.search = require("../images/icon_tab_search.png");
				break;
		}
	}
}
Navigation.PropTypes = {
	col: PropTypes.string.isRequired,
	main: PropTypes.string.isRequired,
	category: PropTypes.string.isRequired,
};

export default Navigation;
