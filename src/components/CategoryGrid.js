/**
 * Created by Tongming on 2017/1/3.
 */
import React from 'react'
import {Link} from 'react-router'
require('../css/CategoryGrid.css');

export default class CategoryGrid extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="category-grid">
				{
					this.props.list === undefined ? [] : this.props.list.map((item) => {
							return <div className="category-i">
								<Link to={'/category/' + item.title + '/' + item.cid}>
									<img src={item.cover} alt={item.title}/>
								</Link>
				 				<span>{item.title}</span>
							</div>
						})
				}
			</div>
		)
	}
}