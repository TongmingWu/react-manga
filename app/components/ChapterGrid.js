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
								             pathname: '/manga/page',
								             query: {chapter_url: item.chapter_url}
							             }}>
								<div className="chapter-i"
									style={
										this.props.historyUrl===item.chapter_url?{
											background:'#ff960c',
											color:'white'
										}:{}
									}>
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
	chapterList: PropTypes.array.isRequired,
	historyUrl:PropTypes.string.isRequired,
};

ChapterGrid.defaultProps = {
	chapterList:[],
	historyUrl:'',
}

export default ChapterGrid;