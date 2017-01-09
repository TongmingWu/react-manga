/**
 * 首页每一项的标题栏
 * Created by Tongming on 2016/12/31.
 */

import React from 'react';
require('../css/ItemHead.css');
import {Link} from 'react-router';

export default class ItemHead extends React.Component {
	//props:[title,index]
	constructor(props) {
		super(props);

		this.icons = [
			require('../images/cb_icon_hot_normal.png'),
			require('../images/ic_recommend.png'),
			require('../images/ic_local.png'),
			require('../images/ic_release.png'),
		];
	}

	render() {
		return (
			<div className="item-head">
				<Link to={"category/" + this.props.index}>
					<img className="icon" src={this.icons[this.props.index]} alt={this.props.title}/>
					<span className="title">{this.props.title}</span>
					<span className="btn-enter">进去看看</span>
				</Link>
			</div>
		)
	}
}