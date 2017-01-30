import React, {PropTypes} from 'react'
import BaseView from './BaseView'
import {connect} from 'react-redux'
import {Link,browserHistory} from 'react-router'
import Toolbar from '../components/Toolbar'
import Button from '../components/Button'
import EditText from '../components/EditText'
import {RSAEncrypt,setCookies} from '../utils'
import {fetchDataIfNeed,updateEditText} from '../actions'
import Loading from '../components/Loading'
import {LOGIN,PHONE} from '../constants/Const'

require('../css/Login.less')

class Login extends BaseView{
    constructor(props){
        super(props);
    }

    componentDidMount(){
        let phone = document.getElementById('et-phone').firstChild;
        if(localStorage.getItem('phone')!==null){
            // phone.value = localStorage.getItem('phone')
            this.props.dispatch(updateEditText(localStorage.getItem('phone'),0))
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.status===1){
            let reducer = this._reactInternalInstance._context.store.getState().loginReducer;
            let data = reducer.data;
            let status = reducer.status;
            if(status===1){
                if(data.code===200){
                    console.log('登录成功')
                    //保存cookies
                    setCookies({
                        token:data.token
                    })
                    browserHistory.replace('/')
                }else{
                    console.log('登录失败')
                    // this.props.dispatch(updateEditText('',1))
                }
            }
        }
    }

    handleKeyDown(ev){
        if(ev.keyCode===13){
            this.login();
        }
    }

    login(){
        let dispatch = this._reactInternalInstance._currentElement._owner._instance.props.dispatch
        dispatch = dispatch===undefined?this.props.dispatch:dispatch
        let phone = document.getElementById('et-phone').firstChild.value;
        let pwd = document.getElementById('et-pwd').firstChild.value;
        if(phone.trim().length>0&&pwd.trim().length>0){
            pwd = RSAEncrypt(pwd)
            dispatch(updateEditText(pwd,1))
            localStorage.setItem('phone',phone)
            dispatch(fetchDataIfNeed({
                method:'POST',
                path:'/login',
                category:LOGIN,
                query:{
                    phone:phone,
                    password:pwd,
                },
            }))
        }else if(phone.trim().length===0){
            alert('帐号不能为空!')
        }else if(pwd.trim().length===0){
            alert('密码不能为空!')
        }
    }

    logon(){
        console.log('logon')
        browserHistory.push('/manga/logon')
    }

    forgotPwd(){
        alert('忘记密码')
    }

    handleChange(child,id,value){
        let kind = 0;
        switch(id){
            case 'et-phone':
                kind = 0
                break;
            case 'et-pwd':
                kind = 1
                break;
        }
        let parent = child._reactInternalInstance._currentElement._owner._instance
        parent.props.dispatch(updateEditText(value,kind))
    }

    render(){
        return(
            <div>
                <Toolbar title='登 录'/>
                <div style={{
                    paddingTop:'4rem'
                }}/>
                <div onKeyDown={this.handleKeyDown.bind(this)} className='login-con'>
                    <div className='logo'/>
                    <EditText value={this.props.phone} onChange={this.handleChange} id='et-phone' type='number' placeholder='手机号码' name='phone'/>
                    <EditText value={this.props.password} onChange={this.handleChange} id='et-pwd' type='password' placeholder='请输入您的密码' name='pwd'/>
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
                <Loading status={this.props.status}/>
            </div>
        )
    }
}

Login.PropTypes = {
    status:PropTypes.number,
    data:PropTypes.object.isRequired,
    phone:PropTypes.string.isRequired,
    password:PropTypes.string.isRequired,
}

Login.defaultProps = {
    status:-3,
    data:{},
    phone:'',
    password:'',
}

function mapStateToProps(state){
    return{
        status:state.loginReducer.status,
        data:state.loginReducer.data,
        phone:state.loginReducer.phone,
        password:state.loginReducer.password,
    }
}

export default connect(mapStateToProps)(Login);