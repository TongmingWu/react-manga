/**
 * Created by Tongming on 2016/12/26.
 */
require('../css/Banner.less');
import React, {Component, PropTypes} from 'react';
import {getScreenWidth} from '../utils'
import {Link} from 'react-router';

class Banner extends Component {
	constructor(props) {
		super(props);
		//将props转换成自己的state
		/*this.state = {
		 currentIndex: 0,
		 };*/
		// this.isInit = false;        //是否初始化
		this.looper = null;
		this.timer = null;
		this.width = getScreenWidth();
	}

	componentDidMount() {
		this.initBanner();
		this.changeImage();
	}

	componentWillUnmount() {
		window.clearTimeout(this.looper);
		window.clearInterval(this.timer);
	}

	//数据获取完成之后调用
	componentDidUpdate() {
		this.initBanner();
		this.changeImage();
	}

	render() {
		return (
			<div className="banner">
				<ul className="ul-img">
					{
						this.props.imgs.map((item, index) => {
							return <Link
								to={{pathname: 'detail', query: {comic_url: item.comic_url}}} key={'img-link-' + index}>
								<li key={'img-li-' + index}>
									<img className="banner-img" src={item.img} alt={item.title}/>
								</li>
							</Link>;
						})
					}
				</ul>
				<ul className="ul-point">
					{
						this.props.imgs.map((item, index) => {
							return <li key={'point-' + index}
							           className={index === this.props.currentIndex ? 'point-selected' : null}/>
						})
					}
				</ul>
			</div>
		)
	}

	initBanner() {
		if (this.props.isInit) {
			return;
		}
		let imgs = document.getElementsByClassName('banner-img');
		if (imgs.length > 0) {
			//ios中使用for of 没有效果
			for (let i = 0; i < imgs.length; i++) {
				imgs[i].style.width = this.width + 'px';
			}
			// this.isInit = true;
		}
	}

	//banner
	changeImage() {
		let _this = this;
		let banner = document.getElementsByClassName('ul-img')[0];
		window.clearTimeout(this.looper);
		let currentPos = parseInt(banner.style.marginLeft || 0, 10);
		let isEnd = _this.width * (_this.props.imgs.length - 1) <= Math.abs(currentPos);
		this.looper = setTimeout(() => {
			//没有发生位移
			if (isEnd) {
				window.clearTimeout(_this.looper);
				banner.style.marginLeft = 0 + 'px';
				_this.props.onLoop(0, _this.props.dispatch);
			} else {
				let count = 0;
				window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
				let animationFrame = requestAnimationFrame(step);
				function step() {
					if (count < _this.width) {
						let offset = 10 > _this.width - count ? _this.width - count : 10;
						banner.style.marginLeft = ((parseInt(banner.style.marginLeft || 0, 10)) - offset) + 'px';
						count += offset;
						animationFrame = requestAnimationFrame(step);
					} else {
						window.cancelAnimationFrame(animationFrame);
						_this.props.onLoop(_this.props.currentIndex + 1, _this.props.dispatch);
					}
				}
			}
		}, 3000);
	}
}

Banner.PropTypes = {
	imgs: PropTypes.array.isRequired
};

export default Banner;