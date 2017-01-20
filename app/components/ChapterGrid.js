/**
 * Created by Tongming on 2017/1/1.
 */
import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router'
require('../css/ChapterGrid.less');

class ChapterGrid extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="chapter-con">
				{
					this.props.chapterList === undefined ? [] : this.props.chapterList.map((item) => {
							return <Link key={item.chapter_url}
							             to={{
								             pathname: '/page',
								             query: {chapter_url: item.chapter_url}
							             }}>
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

ChapterGrid.PropTypes = {
	chapterList: PropTypes.array.isRequired
};

export default ChapterGrid;