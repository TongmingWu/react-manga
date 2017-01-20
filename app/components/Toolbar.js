/**
 * Created by Tongming on 2017/1/1.
 */
import React, {Component, PropTypes} from 'react';
import {browserHistory} from 'react-router'
require('../css/Toolbar.less');

class Toolbar extends Component {
	//props : [title,opacity]
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="toolbar">
				<div style={{
					position:'absolute',
					width:'100%',
					height:'100%',
					opacity:this.props.opacity,
					top:'0',
					zIndex:'-1',
					background:'#ff960c',
				}}/>
				<img onClick={browserHistory.goBack} className="back"
				     src={require('../images/abc_ic_ab_back_mtrl_am_alpha.png')} alt="back"/>
				<span className="tool-title">{this.props.title}</span>
			</div>
		)
	}
}

Toolbar.PropTypes = {
	title: PropTypes.string.isRequired,
	opacity:PropTypes.number,
};

Toolbar.defaultProps = {
	title:'',
	opacity:1,
}

export default Toolbar;