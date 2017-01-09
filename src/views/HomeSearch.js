/**
 * Created by Tongming on 2016/12/26.
 */
import React from 'react';
import api from '../apis'
import Loading from '../components/Loading'
import {Link, browserHistory} from 'react-router';
import SearchBar from '../components/SearchBar'
import CategoryGrid from '../components/CategoryGrid'

class Home extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			status: 0,
			isCompleted: false,
			category: [],
		}
	}

	componentWillMount() {
		this.getData()
	}

	getData() {
		api({
			path: '/comic/category',
			method: 'GET',
			query: {source: 'cc'},
			onSuccess: (json) => {
				this.setState({
					status: 1,
					isCompleted: true,
					category: json.category,
				})
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

	handleSearch(ev, word) {
		console.log(word);
		let url = '/search?word=' + word;
		browserHistory.push(url);
	}

	render() {
		return (
			<div>
				<SearchBar doSearch={this.handleSearch}/>
				<CategoryGrid list={this.state.category}/>
				<Loading status={this.state.status} shown={this.state.isCompleted}/>
			</div>
		)
	}
}

export default Home;
