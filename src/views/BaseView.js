/**
 * Created by Tongming on 2017/1/11.
 */
import React, {Component} from 'react';

class BaseView extends Component {
	constructor(props) {
		super(props);
		this.isUnmount = false;
		this.fet = null;
		this.test = 'test';
	}

	componentDidMount() {
		console.log('parent mount');
		this.getData();
	}

	componentWillUnmount() {
		this.isUnmount = true;
		// if (this.fet != null) {
		// 	console.log(this.fet);
		// 	this.fet.catch();
		// }
	}

	getData() {
		console.log('parent getData');
	}

}

export default BaseView;