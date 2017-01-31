/**
 * Created by Tongming on 2016/12/26.
 */
import React,{PropTypes} from 'react';
import BaseView from './BaseView'
import ComicGrid from '../components/ComicGrid'
import {browserHistory} from 'react-router'
import {connect} from 'react-redux'
require('../css/Home.less');
// import {Link} from 'react-router';

class HomeCollection extends BaseView {
	constructor(props) {
		super(props);
	}

	componentWillUnmount(){

	}

	render() {
		return (
			<div>
				<ComicGrid comics={this.props.collection}/>
			</div>
		)
	}
}

HomeCollection.PropTypes = {
	collection:PropTypes.array.isRequired,
}

HomeCollection.defaultProps = {
	collection:[],
}

function mapStateToProps(state){
	return{
		collection:state.userReducer.user.collection,
	}
}

export default connect(mapStateToProps)(HomeCollection);
