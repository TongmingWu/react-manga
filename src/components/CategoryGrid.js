/**
 * Created by Tongming on 2017/1/3.
 */
import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router'
require('../css/CategoryGrid.css');

class CategoryGrid extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="category-grid">
				{
					this.props.list === undefined ? [] : this.props.list.map((item) => {
							return <div key={'category-' + item.cid} className="category-i">
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

CategoryGrid.PropTypes = {
	list: PropTypes.array.isRequired
};

export default CategoryGrid;