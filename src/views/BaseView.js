/**
 * Created by Tongming on 2017/1/11.
 */
import React, {Component} from 'react';

class BaseView extends Component {
	constructor(props) {
		super(props);
		this.test = 'test';
	}

	componentDidMount() {
		console.log('parent mount');
		this.getData();
	}

	componentWillUnmount() {

	}

	getData() {
		console.log('parent getData');
	}

}

export default BaseView;