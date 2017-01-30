/**
 * Created by Tongming on 2016/12/26.
 */
import React, {PropTypes} from 'react'
import Navigation from '../components/Navigation'
import HomeMain from './HomeMain'
import {connect} from 'react-redux'
import {handleDrawLayout,fetchDataIfNeed} from '../actions'
import {getCookies} from '../utils'
import {USER} from '../constants/Const'
import DrawLayout, {LEFT, RIGHT, OPENED, CLOSE, RUNNING} from '../components/DrawLayout'
require('../css/Home.less');

class Home extends React.Component {

	constructor(props) {
		super(props);
		this.menu = [
			{
				title: '首页',
				icon: require('../images/ic_home_grey_500_18dp.png'),
				url:'/manga/home/main'
			},
			{
				title: '历史记录',
				icon: require('../images/ic_drawer_history.png'),
				url:'/manga/history'
			},
			{
				title: '我的收藏',
				icon: require('../images/ic_drawer_collect.png'),
				url:'/manga/home/collection'
			},
			{
				title: '设置中心',
				icon: require('../images/ic_drawer_setting.png')
			}
		]
	}

	componentDidMount() {
		let token = getCookies("token")
		if(token!==''){
			this.props.dispatch(fetchDataIfNeed({
				path:'/user',
				method:'GET',
				category:USER,
				query:{
					token
				},
			}))
		}
		this.props.router.setRouteLeaveHook(
			this.props.route,
			this.routerWillLeave
		);
	}

	routerWillLeave() {

	}

	toggleDrawLayout() {
		this.refs.drawLayout.openDrawLayout();
	}

	dispatchDrawLayout(status) {
		this.props.dispatch(handleDrawLayout(status));
	}

	render() {
		return (
			<div>
				<div
					className="home-con" style={{paddingTop: '4rem'}}>
					{React.cloneElement(this.props.children || <HomeMain/>, {
						key: this.props.location.pathname
					})}
				</div>
				<Navigation avatar={this.props.user.avatar} />
				<DrawLayout
					name={this.props.user.name}
					menu={this.menu} avatar={this.props.user.avatar}
					gravity={LEFT} ref="drawLayout" status={this.props.drawStatus}/>
			</div>
		)
	}
}

Home.PropTypes = {
	drawStatus: PropTypes.number,
	user:PropTypes.object,
};

function mapStateToProps(state) {
	return {
		drawStatus: state.appReducer.drawStatus,
		user:state.userReducer.user	
	}
}

export default connect(mapStateToProps)(Home);
