import React, {PropTypes} from 'react'
import BaseView from './BaseView'
import {connect} from 'react-redux'
import {fetchDataIfNeed} from '../actions'
import {USER} from '../constants/Const'
import {getCookies} from '../utils'
import Toolbar from '../components/Toolbar'
import Loading from '../components/Loading'
import Button from '../components/Button'
require('../css/UserInfo.less')

class UserInfo extends BaseView{

    constructor(props){
        super(props)
    }

    getData(){
        this.props.dispatch(fetchDataIfNeed({
            category:USER,
            path:'/user',
            method:'GET',
            query:{
                token:getCookies('token')
            }
        }))
    }

    logout(){
        alert('注销')
    }

    render(){
        let time = new Date(this.props.user.logon_date*1000)
        let logon = `${time.getFullYear()}-${time.getMonth()+1}-${time.getDate()}`
        return(
            <div>
                <Toolbar title='用户中心' />
                <div style={{
                    display:this.props.status===1?'flex':'none'
                }} className='container'>
                    <div className='item side'>
                        <span className='item-name'>头像</span>
                        <div className='info-avatar'>
                            <img src={this.props.user.avatar===null?require('../images/default_avatar.png'):this.props.user.avatar}/>
                        </div>
                    </div>
                    <div className='item'>
                        <span className='item-name'>昵称</span>
                        <span className='item-info'>{this.props.user.name}</span>
                    </div>
                    <div className='item'>
                        <span className='item-name'>性别</span>
                        <span className='item-info'>{this.props.user.sex}</span>
                    </div>
                    <div className='item'>
                        <span className='item-name'>注册时间</span>
                        <span className='item-info'>{logon}</span>
                    </div>
                    <div className='item side'>
                        <span className='item-name'>个性签名</span>
                        <span className='item-info'>{this.props.user.pesonality}</span>
                    </div>
                    <Button id='btn-logout' text='注销' width='90%' height='4rem'
                            margin='5% 5% 5% 5%' radius='.5rem' onClick={this.logout}/>
                </div>
                
                <Loading status={this.props.status}/>
            </div>
        )
    }
}

UserInfo.PropTypes = {
    status:PropTypes.number,
    user:PropTypes.object,
}

UserInfo.defaultProps = {
    status:-3,
}

function mapStateToProps(state){
    return{
        status:state.userReducer.status,
        user:state.userReducer.user,
    }
}

export default connect(mapStateToProps)(UserInfo);