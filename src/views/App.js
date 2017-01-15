require('../css/App.css');
import React from 'react';


export default React.createClass({
	render(){
		return (
			<div>
				{React.cloneElement(this.props.children, {
					key: this.props.location.pathname
				})}
			</div>
		)
	}
})

// export default App;
/*<ReactCSSTransitionGroup
 className="transitionWrapper"
 transitionName="transitionWrapper"
 component="div"
 transitionEnterTimeout={300}
 transitionLeaveTimeout={300}

 >
 {React.cloneElement(this.props.children, {
 key: this.props.location.pathname
 })}
 </ReactCSSTransitionGroup>*/