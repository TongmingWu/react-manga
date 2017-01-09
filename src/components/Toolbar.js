/**
 * Created by Tongming on 2017/1/1.
 */
import React from 'react';
import {browserHistory} from 'react-router'
require('../css/Toolbar.css');

export default class Toolbar extends React.Component{
	//props : [title]
	constructor(props){
		super(props);
	}

	render(){
		return(
			<div className="toolbar">
				<img onTouchStart={browserHistory.goBack} className="back" src={require('../images/abc_ic_ab_back_mtrl_am_alpha.png')} alt="back"/>
				<span className="tool-title">{this.props.title}</span>
			</div>
		)
	}
}