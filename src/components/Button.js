/**
 * Created by Tongming on 2017/1/1.
 */
import React from 'react';
require('../css/Button.css');

export default class Button extends React.Component {
	constructor(props) {
		super(props);
		//props:text
	}

	render() {
		return (
			<div onClick={this.props.clickEvent} className="cus-btn">
				{this.props.text}
			</div>
		)
	}
}