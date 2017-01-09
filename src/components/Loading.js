/**
 * Created by Tongming on 2017/1/3.
 */
import React from 'react';
require('../css/Loading.css');

export default class Loading extends React.Component {
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
				<img className={!this.props.shown ? 'loading-img loading-shown' : 'loading-img'}
				     src={this.props.status === 0 || this.props.status === undefined ? require('../images/loading.svg') :
					     (this.props.status === 1 ? '' : require('../images/load_error.png'))}/>
			</div>
		)
	}
}