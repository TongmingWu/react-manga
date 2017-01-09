/**
 * Created by Tongming on 2016/12/26.
 */
import React from 'react';
import LazyLoad from 'react-lazy-load'
require('../css/ComicItem.css');

export default class ComicItem extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="comic-i">
				<img className="cover"
				     src={this.props.comic.cover == '' ? require('../images/load_error.png') : this.props.comic.cover}
				     alt={this.props.comic.comic_name}/>
				<span className="author-i">
					{this.props.comic.comic_author === "" ? this.props.comic.newest_chapter : this.props.comic.comic_author}
					</span>
				<span className="title-i">{this.props.comic.comic_name}</span>
			</div>
		)
	}
}