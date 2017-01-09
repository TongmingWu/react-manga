/**
 * Created by Tongming on 2016/12/26.
 */
import React from 'react'
import ComicItem from './ComicItem'
import {Link} from 'react-router'
require('../css/ComicGrid.css');

export default class ComicGrid extends React.Component {
	//props : [comics:Object]
	constructor(props) {
		super(props);
		this.state = {
			comics: this.props.comics
		};
	}

	componentWillReceiveProps(nextProps) {
		//更新state
		this.setState({comics: nextProps.comics});
	}

	render() {
		return (
			<div className="grid">
				{
					this.state.comics === undefined ? [] : this.state.comics.map((item) => {
							return <Link to={{pathname: '/detail', query: {comic_url: item.comic_url}}}>
								<ComicItem key={item.comic_id} comic={item}/>
							</Link>
						})
				}
			</div>
		)
	}
}