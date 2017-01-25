import React, {PropTypes} from 'react'
import BaseView from './BaseView'
import {connect} from 'react-redux'
import Toolbar from '../components/Toolbar'
import Button from '../components/Button'
import EditText from '../components/EditText'
require('../css/Login.less')

class Login extends BaseView{
    constructor(props){
        super(props);
    }

    login(){
        console.log('login')
    }

    encrypt(pwd){

    }

    logon(){
        console.log('logon')
    }

    forgotPwd(){
        console.log('忘记密码')
    }

    render(){
        return(
            <div>
                <Toolbar title='登录'/>
                <div style={{
                    paddingTop:'4rem'
                }}/>
                <div className='login-con'>
                    <div className='logo'/>
                    <EditText id='et-phone' type='number' placeholder='手机号码' name='phone'/>
                    <EditText id='et-pwd' type='password' placeholder='请输入您的密码' name='pwd'/>
                    <div style={{
                        paddingTop:'1rem'
                    }}/>
                    <Button onClick={this.login} id='login' width='100%' height='4rem' radius='.5rem'
                            margin='2% auto 2% auto'
                            fontSize='1.8rem' text=' 登 录 '/>
                    <div className='feedback'>
                        <span onClick={this.forgotPwd.bind(this)} id='forgot-pwd'>忘了密码?</span>
                        <span onClick={this.logon.bind(this)} id='logon'>注册新账号</span>
                    </div>
                </div>
            </div>
        )
    }
}

Login.PropTypes = {

}

Login.defaultProps = {

}

function mapStateToProps(state){
    return{

    }
}

export default connect(mapStateToProps)(Login);