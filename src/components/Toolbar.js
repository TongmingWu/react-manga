/**
 * Created by Tongming on 2017/1/1.
 */
import React, {Component, PropTypes} from 'react';
import {browserHistory} from 'react-router'
require('../css/Toolbar.css');

class Toolbar extends Component {
	//props : [title]
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="toolbar">
				<img onClick={browserHistory.goBack} className="back"
				     src={require('../images/abc_ic_ab_back_mtrl_am_alpha.png')} alt="back"/>
				<span className="tool-title">{this.props.title}</span>
			</div>
		)
	}
}

Toolbar.PropTypes = {
	title: PropTypes.string.isRequired,
};

export default Toolbar;