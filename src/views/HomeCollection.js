/**
 * Created by Tongming on 2016/12/26.
 */
import React from 'react';
import api from '../apis'
import Navigation from '../components/Navigation'
import Banner from '../components/Banner';
import ItemHead from '../components/ItemHead'
import ComicGrid from '../components/ComicGrid'
import Loading from '../components/Loading'
require('../css/Home.css');
// import {Link} from 'react-router';

class Home extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			status: 0,
			isCompleted: false,
		}
	}

	componentWillMount() {
		// this.getData()
	}

	getData() {
		api({
			path: '/cc/',
			method: 'GET',
			onSuccess: (json) => {

			},
			onFail: (error) => {
				console.log(error);

			}
		})
	}

	componentDidMount() {
		this.props.router.setRouteLeaveHook(
			this.props.route,
			this.routerWillLeave
		);
	}

	routerWillLeave() {
		console.log('routerWillLeave');
	}

	render() {
		return (
			<div>
				<h2>I am collection!</h2>
				<Loading status={this.state.status} shown={this.state.isCompleted}/>
			</div>
		)
	}
}

export default Home;
