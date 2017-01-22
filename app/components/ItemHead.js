/**
 * 首页每一项的标题栏
 * Created by Tongming on 2016/12/31.
 */
import React, {Component, PropTypes} from 'react';
require('../css/ItemHead.less');
import {Link} from 'react-router';

class ItemHead extends Component {
	//props:[title,index,url]
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
				<Link to={this.props.url}>
					<img className="icon" src={this.icons[this.props.index]} alt={this.props.title}/>
					<span className="title">{this.props.title}</span>
					<span className="btn-enter">进去看看</span>
				</Link>
			</div>
		)
	}
}

ItemHead.PropTypes = {
	title: PropTypes.string.isRequired,
	index: PropTypes.number.isRequired,
	url: PropTypes.string.isRequired,
};

ItemHead.defaultProps = {
	title: '',
	index: 0,
	url: '',
}

export default ItemHead;