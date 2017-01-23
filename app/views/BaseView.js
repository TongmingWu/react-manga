/**
 * Created by Tongming on 2017/1/11.
 */
import React, {Component} from 'react';
import {getScreenWidth,getScreenHeight,getDocumentTop} from '../utils'
import {HOME,DETAIL,CATEGORY,SEARCH} from '../constants/Const'
import {recordLocation,initImage,onLoop} from '../actions/index'

class BaseView extends Component {
	constructor(props) {
		super(props);
		this.isChange = false;
		this.kind = '';
	}

	componentDidMount() {
		if (this.props.status === 1) {
			document.body.scrollTop = this.props.localTop;
		}
		this.getData();
		this.initCover();
		window.onorientationchange = ()=>{
			this.isChange = true;
			this.initCover();
			this.isChange = false;
		}
	}

	componentWillUnmount() {
		window.onorientationchange = null;
		console.log(this.type);
		const dispatch = this.props.dispatch;
		switch(this.kind){
			case HOME:
				dispatch(onLoop(0));
			case SEARCH:
				dispatch(initImage(false,this.kind));
			default:
				dispatch(recordLocation(getDocumentTop(),this.kind))
				break
		}
	}

	getData() {
		console.log('parent getData');
	}

	componentDidUpdate() {
		this.initCover();
	}

	initCover(){

	}

}

export default BaseView;