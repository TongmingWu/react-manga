/**
 * Created by Tongming on 2017/1/16.
 * DrawLayout 侧滑菜单
 */
import React, {Component, PropTypes} from 'react'
import {getScreenWidth} from '../utils'
import {Link,browserHistory} from 'react-router'
require('../css/DrawLayout.less');
export const [CLOSE, RUNNING, OPENED] = [-1, 0, 1];
export const [LEFT, RIGHT] = [0x01, 0x02];

class DrawLayout extends Component {
	/*可定制的属性:{
	 gravity:left(从左边滑出),right(从右边滑出),
	 speed:运动的速度,
	 menu:菜单  [...{title:'',icon:'',onSelected:func,}]
	 position:当前选中的项
	 }*/
	constructor(props) {
		super(props);
	}

	toggleDrawLayout() {
		switch (this.props.status) {
			case RUNNING:
			case OPENED:
				this.closeDrawLayout();
				break;
			case CLOSE:
				this.openDrawLayout();
				break;
			default:
				break;
		}
	}

	openDrawLayout() {
		this.startDrawRunner(OPENED);
	}

	closeDrawLayout() {
		this.startDrawRunner(CLOSE);
	}

	startDrawRunner(status = CLOSE) {
		//速度为加速递减
		let drawLayout = document.getElementsByClassName('draw-layout-con')[0];
		let width = getScreenWidth();
		console.log('width = '+width)
		let total = (status === OPENED) ? getScreenWidth() : 0;
		let factor = (status === OPENED) ? -1 : 1;  //表示展开或收起
		let currentPos = 0;
		let offset = 0;
		let speed = this.props.speed;
		let startTime = new Date().getTime();
		let parent = this._reactInternalInstance._currentElement._owner._instance;
		parent.dispatchDrawLayout(RUNNING); //运动中

		window.requestAnimationFrame = window.requestAnimationFrame
			|| window.mozRequestAnimationFrame
			|| window.webkitRequestAnimationFrame
			|| window.msRequestAnimationFrame;
		let _this = this;
		let animationFrame = requestAnimationFrame(step);

		function step() {
			if (currentPos < width) {
				offset = width - currentPos > speed * 24 ? speed * 24 : width - currentPos;
				currentPos += offset;
				speed = speed * 0.98;	//速度曲线出现问题
				// console.log(`offset=${offset} speed=${speed}`);
				if (_this.props.gravity === LEFT) {
					drawLayout.style.left = factor * (total - currentPos) + 'px';
				} else {
					drawLayout.style.right = factor * (total - currentPos) + 'px';
				}
				animationFrame = requestAnimationFrame(step);
			} else {
				console.log(`花费的时间 : ${new Date().getTime() - startTime}`);
				// window.clearInterval(drawTimer);
				window.cancelAnimationFrame(animationFrame);
				parent.dispatchDrawLayout(status);
			}
		}
	}

	handleTouchStart(ev) {
		let width = getScreenWidth();
		if (this.props.status === OPENED && ((this.props.gravity === LEFT && ev.targetTouches[0].clientX > (width * 0.8))
			|| (this.props.gravity === RIGHT && ev.targetTouches[0].clientX < (width * 0.2)))) {
			this.closeDrawLayout();
		}
		ev.preventDefault();
	}

	handleTouchMove(ev) {
		// console.log('move')
	}

	handleTouchEnd(ev) {
		// console.log(ev)
	}

	jumpTo(url){
		console.log(url)
		browserHistory.push(url)
	}

	render() {
		//横屏问题
		return (
			<div className="draw-layout-con" style={
				this.props.gravity === LEFT ? {left: '-100%'} :
					{right: '-100%'}}
			     onTouchStart={this.handleTouchStart.bind(this)}
			     onTouchMove={this.handleTouchMove.bind(this)}
			     onTouchEnd={this.handleTouchEnd.bind(this)}>
				<div className="draw-layout" style={{float: this.props.gravity === LEFT ? 'left' : 'right'}}>
					<div onTouchEnd={this.jumpTo.bind(this,this.props.name===''?'/manga/login':'/manga/userinfo')} className="draw-layout-head">
						<div className="draw-avatar" style={{
							background: `url(${(this.props.avatar === ''||this.props.avatar===null) ? `${require('../images/default_avatar.png')}` : this.props.avatar})`
							, backgroundSize: 'contain'
						}}>
							<span className="draw-user-name">{this.props.name===''?'未登录':this.props.name}</span>
						</div>
					</div>
					<div className="draw-menu">
						{
							this.props.menu.map((item, index) => {
									return <Link to={item.url} className='menu-item' onTouchStart={this.jumpTo.bind(this,item.url)}>
										<div
											style={this.props.position===index?{
												background:'#ccc',
												color:'#ff960c',
											}:{}}>
											<div className="menu-item-icon" style={{
												background: `url(${item.icon}) no-repeat`,
												backgroundSize: '2.4rem 2.4rem',
												filter:this.props.position === index?'drop-shadow(3.6rem 0 0 #ff960c)':'drop-shadow(3.6rem 0 0 #aaa)'
											}}/>
											<span className="menu-item-title">{item.title}</span>
										</div>
									</Link>
								})
						}
					</div>
				</div>
			</div>
		)
	}
}

DrawLayout.PropTypes = {
	gravity: PropTypes.number,
	speed: PropTypes.number,
	status: PropTypes.number,
	position: PropTypes.number,
	menu:PropTypes.array.isRequired,
	avatar:PropTypes.string.isRequired,
	name:PropTypes.string.isRequired,
};

DrawLayout.defaultProps = {
	gravity: LEFT,
	speed: 1,
	status: CLOSE,
	position: 0,
	menu:[],
	avatar:'',
	name:'',
};

export default DrawLayout;