/**
 * Created by Tongming on 2016/12/26.
 */
import React, {PropTypes} from 'react'
import Navigation from '../components/Navigation'
import HomeMain from './HomeMain'
import {connect} from 'react-redux'
import {handleDrawLayout} from '../actions'
import DrawLayout, {LEFT, RIGHT, OPENED, CLOSE, RUNNING} from '../components/DrawLayout'
require('../css/Home.less');

class Home extends React.Component {

	constructor(props) {
		super(props);
		this.menu = [
			{
				title: '首页',
				icon: require('../images/ic_home_grey_500_18dp.png')
			},
			{
				title: '历史记录',
				icon: require('../images/ic_drawer_history.png'),
			},
			{
				title: '我的收藏',
				icon: require('../images/ic_drawer_collect.png')
			},
			{
				title: '设置中心',
				icon: require('../images/ic_drawer_setting.png')
			}
		]
	}

	componentDidMount() {
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
				<Navigation />
				<DrawLayout
					menu={this.menu}
					gravity={LEFT} ref="drawLayout" status={this.props.drawStatus}/>
			</div>
		)
	}
}

Home.PropTypes = {
	drawStatus: PropTypes.number,
};

function mapStateToProps(state) {
	return {
		drawStatus: state.appReducer.drawStatus,
	}
}

export default connect(mapStateToProps)(Home);
