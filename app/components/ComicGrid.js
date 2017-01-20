/**
 * Created by Tongming on 2016/12/26.
 */
import React, {Component, PropTypes} from 'react'
import ComicItem from './ComicItem'
import {Link} from 'react-router'
require('../css/ComicGrid.less');

class ComicGrid extends Component {
	//props : [comics:Object]
	constructor(props) {
		super(props);
		this.isInit = false;
	}

	componentWillReceiveProps(nextProps) {
		// console.log(nextProps);
	}

	render() {
		return (
			<div className="grid">
				{
					this.props.comics.map((item) => {
							return <Link key={item.comic_url}
							             to={{pathname: '/detail', query: {comic_url: item.comic_url}}}>
								<ComicItem comic={item}/>
							</Link>
						})
				}
			</div>
		)
	}
}
ComicGrid.PropTypes = {
	comics: PropTypes.array.isRequired
};

ComicGrid.defaultProps = {
	comics: [],
}

export default ComicGrid;