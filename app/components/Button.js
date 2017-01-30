/**
 * Created by Tongming on 2017/1/1.
 */
import React, {Component, PropTypes} from 'react';
require('../css/Button.less');

class Button extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div id={this.props.id} onClick={this.props.onClick.bind(this)} className="cus-btn"
				style={{
					borderTopLeftRadius:this.props.radius,
					borderTopRightRadius:this.props.radius,
					borderBottomLeftRadius:this.props.radius,
					borderBottomRightRadius:this.props.radius,
					width:this.props.width,
					height:this.props.height,
					lineHeight:this.props.height,
					fontSize:this.props.fontSize,
					margin:this.props.margin,
				}}>
				{this.props.text}
			</div>
		)
	}
}

Button.PropTypes = {
	id:PropTypes.string.isRequired,
	text: PropTypes.string.isRequired,
	radius:PropTypes.string.isRequired,
	width:PropTypes.string.isRequired,
	height:PropTypes.string.isRequired,
	fontSize:PropTypes.string.isRequired,
	margin:PropTypes.string.isRequired,
	onClick:PropTypes.func.isRequired,
};

Button.defaultProps = {
	id:'',
	text: '',
	radius:'',
	width:'',
	height:'',
	fontSize:'1.2rem',
	margin:'0 0 0 0',
	onClick:()=>{},
}

export default Button;