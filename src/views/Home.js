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
import HomeMain from './HomeMain';
require('../css/Home.css');
// import {Link} from 'react-router';

class Home extends React.Component {

	constructor(props) {
		super(props);
		this.state = {

		};
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
				<Navigation/>
				{React.cloneElement(this.props.children || <HomeMain/>, {
					key: this.props.location.pathname
				})}
			</div>
		)
	}
}

export default Home;
