/**
 * Created by Tongming on 2016/12/26.
 */
import React from 'react';
import {browserHistory} from 'react-router';
import api from '../apis';
import Toolbar from '../components/Toolbar'
import Button from '../components/Button'
import ChapterGrid from '../components/ChapterGrid'
import Loading from '../components/Loading'
require('../css/Detail.css');

export default class Detail extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			detail: {},
			isCompleted: false,
			status: 0,
		}
	}

	componentWillMount() {
		this.comicUrl = this.props.location.query.comic_url;
		if (this.comicUrl === undefined) {
			browserHistory.push('/');
		} else {
			console.log('comicUrl = ' + this.comicUrl);
			this.getData();
		}
	}

	getData() {
		api({
			path: '/cc/comic/detail',
			method: 'GET',
			query: {comic_url: this.comicUrl},
			onSuccess: (json) => {
				this.setState({
					detail: json,
					isCompleted: true,
					status: 1,
				})
			},
			onFail: (error) => {
				console.log(error);
				this.setState({
					status: -1,
				})
			}
		})
	}

	startRead() {
		browserHistory.push('/page?chapter_url=' + this.state.detail.newest_chapter_url)
	}

	collectComic() {
		console.log('collect')
	}

	render() {
		return (
			<div>
				<Toolbar title={this.state.detail.comic_name}/>
				<div style={{visibility: this.state.isCompleted ? "visible" : "hidden"}} className="con-info">
					<img className="cover"
					     src={this.state.detail.cover == '' ? require('../images/load_error.png') : this.state.detail.cover}
					     alt={this.state.detail.comic_name}/>
					<div className="info-r">
						<span className="info-title">{this.state.detail.comic_name}</span>
						<span>作者：{this.state.detail.comic_author}</span>
						<span>状态：{this.state.detail.status}</span>
						<span>地区：{this.state.detail.comic_area}</span>
						<Button clickEvent={this.startRead.bind(this)}
						        text="开始阅读"/>
						<Button clickEvent={this.collectComic.bind(this)} text="收藏"/>
					</div>
					<p className="desc">{this.state.detail.desc}</p>
					<div>
						<span className="chapter-span">共{this.state.detail.chapter_list === undefined ? 0 :
							this.state.detail.chapter_list.length}话</span>
						<span
							className="chapter-span chapter-span-r">
							更新于{this.state.detail.newest_chapter_date === undefined ? '' : this.state.detail.newest_chapter_date.split(' ')[0]}
							</span>
					</div>
					<ChapterGrid chapterList={this.state.detail.chapter_list}/>
				</div>
				<Loading shown={this.state.isCompleted} status={this.state.status}/>
			</div>
		)
	}
}