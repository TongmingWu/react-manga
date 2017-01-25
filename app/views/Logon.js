import React, {PropTypes} from 'react'
import BaseView from './BaseView'
import {connect} from 'react-redux'

class Logon extends BaseView{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div>
                <Toolbar title='注册'/>
                <div style={{paddingTop:'4rem'}}/>

            </div>
        )
    }
}

Logon.PropTypes = {

}

Logon.defaultProps = {

}

function mapStateToProps(state){
    return{

    }
}

export default connect(mapStateToProps)(Logon);