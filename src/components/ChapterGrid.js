/**
 * Created by Tongming on 2017/1/1.
 */
import React from 'react';
import {Link} from 'react-router'
require('../css/ChapterGrid.css');

export default class ChapterGrid extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				{
					this.props.chapterList === undefined ? [] : this.props.chapterList.map((item) => {
							return <Link to={{pathname: '/page', query: {chapter_url: item.chapter_url}}}>
								<div className="chapter-i">
									{item.chapter_title}
								</div>
							</Link>
						})
				}
			</div>
		)
	}
}