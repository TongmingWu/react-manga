/**
 * Created by Tongming on 2016/12/26.
 */
import React from 'react';
import api from '../apis'
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
			banner: [],
			hot: [],
			release: [],
			local: [],
			recommend: [],
			isCompleted: false,
			status: 0,
		};
	}

	componentWillMount() {
		this.getData()
	}

	getData() {
		api({
			path: '/cc/',
			method: 'GET',
			onSuccess: (json) => {
				this.setState({
					banner: json.banner,
					hot: json.result.hot,
					release: json.result.release,
					local: json.result.local,
					recommend: json.result.recommend,
					isCompleted: true,
					status: 1,
				});
			},
			onFail: (error) => {
				console.log(error);
				this.setState({
					status: -1
				})
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
				<div style={{visibility: this.state.isCompleted ? "visible" : "hidden"}}>
					<Banner imgs={this.state.banner}/>
					<ItemHead title="热门连载" index="0"/>
					<ComicGrid comics={this.state.hot}/>
					<ItemHead title="精彩推荐" index="1"/>
					<ComicGrid comics={this.state.recommend}/>
					<ItemHead title="精选国漫" index="2"/>
					<ComicGrid comics={this.state.local}/>
					<ItemHead title="最新上架" index="3"/>
					<ComicGrid comics={this.state.release}/>
					<div className="space"></div>
				</div>
				<Loading status={this.state.status} shown={this.state.isCompleted}/>
			</div>
		)
	}
}

export default Home;
