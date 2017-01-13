/**
 * Created by Tongming on 2017/1/3.
 */
import React, { Component, PropTypes } from 'react'
require('../css/Loading.css');

class Loading extends Component {
	//props : [shown:是否显示,status:0,1,-1 加载中,成功或错误]
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="loading-con">
				{/*<span className={!this.props.shown ? 'loading loading-shown' : 'loading'}>
				 {
				 this.props.status === 0 || this.props.status === undefined ? '正在加载...' :
				 (this.props.status === 1 ? '加载成功' : '加载失败 - -')
				 }
				 </span>*/}
				<img className={!(this.props.status === 1) ? 'loading-img loading-shown' : 'loading-img'}
				     src={this.props.status === 0 || this.props.status === undefined ? require('../images/loading.svg') :
					     (this.props.status === 1 ? '' : require('../images/load_error.png'))}/>
			</div>
		)
	}
}

Loading.PropTypes = {
	status: PropTypes.number.isRequired,
	shown: PropTypes.bool.isRequired
};

export default Loading;