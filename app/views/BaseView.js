/**
 * Created by Tongming on 2017/1/11.
 */
import React, {Component} from 'react';
import {getScreenWidth,getScreenHeight,getDocumentTop} from '../utils'

class BaseView extends Component {
	constructor(props) {
		super(props);
		this.isChange = false;
	}

	componentDidMount() {
		console.log(this.props.route);
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