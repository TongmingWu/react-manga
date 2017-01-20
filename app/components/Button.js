/**
 * Created by Tongming on 2017/1/1.
 */
import React, {Component, PropTypes} from 'react';
require('../css/Button.less');

class Button extends Component {
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

Button.PropTypes = {
	text: PropTypes.string.isRequired,
};

export default Button;