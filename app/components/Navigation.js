/**
 * Created by Tongming on 2016/12/26.
 */
require('../css/Navigation.less');
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

	openDrawLayout() {
		let parent = this._reactInternalInstance._currentElement._owner._instance;
		// this.props.onOpen();
		parent.toggleDrawLayout()
	}

	render() {
		return (
			<div className="nav">
				<div className="cl-nav" onTouchStart={this.openDrawLayout.bind(this)}>
					<img className="nav-i" src={require('../images/icon_tab_more.png')} alt="nav"/>
					<div className="avatar"
						style={{
								background: `url(${this.props.avatar === '' ? `${require('../images/default_avatar.png')}` : this.props.avatar})`,
								backgroundSize: '3rem 3rem'
							}}/>
				</div>
				<div className="cl-tab">
					<Link to="/manga/home/collection">
						<img className="tab-item" src={this.col}/>
					</Link>
					<Link to="/manga/home/main">
						<img className="tab-item" src={this.main}/>
					</Link>
					<Link to="/manga/home/category">
						<img className="tab-item" src={this.search}/>
					</Link>
				</div>
				<div className="tab-line">
					{[0, 1, 2].map((item) =>
						<div className="tab-line-item">
						</div>)}
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
	avatar:PropTypes.string.isRequired,
};


export default Navigation;
