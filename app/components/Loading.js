/**
 * Created by Tongming on 2017/1/3.
 */
import React, { Component, PropTypes } from 'react'
require('../css/Loading.less');

class Loading extends Component {
	//props : [shown:是否显示,status:0,1,-1 加载中,成功或错误]
	constructor(props) {
		super(props);
	}

	render() {
		return this.props.status===0?(
			<div className="loading-con">
				<img src={require('../images/loading.svg')}/>
					    {/*  (this.props.status === -1 ? require('../images/load_error.png') : '')}/>*/}
			</div>
		):null
	}
}

Loading.PropTypes = {
	status: PropTypes.number.isRequired,
	shown: PropTypes.bool.isRequired
};

Loading.defaultProps = {
	status: -3,
	shown: false,
}

export default Loading;