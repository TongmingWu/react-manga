import React, {PropTypes} from 'react'
import BaseView from './BaseView'
import {connect} from 'react-redux'
import {browserHistory} from 'react-router'
import EditText from '../components/EditText'
import Button from '../components/Button'
import Toolbar from '../components/Toolbar'
import Loading from '../components/Loading'
import {LOGON,APP_ID,APP_KEY,PHONE,PASSWORD,PASSWORD_CONFIRM,
    CODE,CODE_TIMER} from '../constants/Const'
import {updateEditText,fetchDataIfNeed,codeTimer} from '../actions'
import {checkPhone,RSAEncrypt} from '../utils'
require('../css/Logon.less')

class Logon extends BaseView{
    constructor(props){
        super(props);
        this.timer = null;
    }

    handleChange(child,id,value){
        let kind = LOGON;
        switch(id){
            case 'et-phone':
                kind += PHONE
                break;
            case 'et-pwd':
                kind += PASSWORD;
                break;
            case 'et-cpwd':
                kind += PASSWORD_CONFIRM;
                break;
            case 'et-code':
                kind += CODE;
                break;
        }
        let parent = child._reactInternalInstance._currentElement._owner._instance
        parent.props.dispatch(updateEditText(value,kind))
    }

    getCode(){
        if(this.props.end){
            return;
        }
        let parent = this._reactInternalInstance._currentElement._owner._instance;
        let phone = document.getElementById('et-phone').firstChild.value;
        if(checkPhone(phone)){
            parent.props.dispatch(fetchDataIfNeed({
                method:'POST',
                path:'/sms',
                // category:LOGON,
                query:{
                    phone,
                    appId:APP_ID,
                    appKey:APP_KEY,
                }
            }))
            parent.codeTimer();
        }else{
            console.log('手机格式不正确')
        }
    }

    /**
     * 验证码按钮定时器
     */
    codeTimer(){
        if(this.timer!==null){
            return;
        }
        let count = 60;
        this.timer = setInterval(()=>{
            if(count===0){
                this.props.dispatch(codeTimer(`重新获取`,true))
                window.clearInterval(this.timer)
                this.timer = null;
            }else{
                this.props.dispatch(codeTimer(`重新获取(${count})`,false))
                count -= 1;
            }
        },1000)
    }

    logon(){
        let parent = this._reactInternalInstance._currentElement._owner._instance
        let phone = document.getElementById('et-phone').firstChild.value;
        let pwd = document.getElementById('et-pwd').firstChild.value;
        let cpwd = document.getElementById('et-cpwd').firstChild.value;
        let code = document.getElementById('et-code').firstChild.value;
        if(parent.checkInput(phone,pwd,cpwd,code)){
            console.log('开始注册')
            parent.props.dispatch(fetchDataIfNeed({
                method:'POST',
                path:'/logon',
                category:LOGON,
                query:{
                    phone,
                    password:RSAEncrypt(pwd),
                    code,
                    appId:APP_ID,
                    appKey:APP_KEY
                }
            }))
        }else{
            console.log('重新填写')
            alert('格式不正确,请重新填写')
        }
    }

    checkInput(phone,pwd,cpwd,code){
        if(!checkPhone(phone)){
            console.log('手机格式不正确')
            return false;
        }else if(pwd.length>0&&pwd!==cpwd){
            console.log('密码不一致')
            return false;
        }else if(code.trim().length<=0){
            console.log('验证码不能为空')
            return false;
        }
        return true;
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.status===1&&nextProps.data!==undefined){
            if(nextProps.data.code===200){
                browserHistory.replace('/manga/login')
            }else{
                alert('注册失败')
            }
        }
    }

    render(){
        return(
            <div>
                <Toolbar title='注册'/>
                <div style={{paddingTop:'4rem'}}/>
                <div className='logon-con'>
                    <div className='logo'/>
                    <EditText id='et-phone' type='number' onChange={this.handleChange}
                              placeholder='手机号码' value={this.props.phone}/>
                    <EditText id='et-pwd' type='password' margin='.8rem 0 0 0' onChange={this.handleChange} 
                              placeholder='密码' value={this.props.password}/>
                    <EditText id='et-cpwd' type='password' margin='.8rem 0 0 0' 
                              onChange={this.handleChange} placeholder='确认密码'
                              value={this.props.cpassword}/>
                    <EditText id='et-code' type='number' margin='.8rem 0 0 0' 
                              width='40%' onChange={this.handleChange} placeholder='验证码'
                              value={this.props.code}
                              />
                    <Button text={this.props.codeText} width='30%' height='3.6rem' radius='1.8rem'
                            margin='0 5%' onClick={this.getCode} background={this.props.end?'#07f534':'gray'}/>
                    <Button id='btn-logon' text='注册' width='96%' height='4rem'
                            margin='5% 2%' radius='.5rem' onClick={this.logon}/>
                </div>
                <Loading status={this.props.status}/>
            </div>
        )
    }
}

Logon.PropTypes = {
    status:PropTypes.number.isRequired,
    data:PropTypes.object.isRequired,
    phone:PropTypes.number.isRequired,
    password:PropTypes.string.isRequired,
    cpassword:PropTypes.string.isRequired,
    code:PropTypes.number.isRequired,
    codeText:PropTypes.string.isRequired,
    end:PropTypes.bool.isRequired,
}

Logon.defaultProps = {
    status:-3,
    data:{},
    codeText:'获取验证码',
    end:true,
}

function mapStateToProps(state){
    return{
        status:state.logonReducer.status,
        data:state.logonReducer.data,
        phone:state.logonReducer.phone,
        password:state.logonReducer.password,
        cpassword:state.logonReducer.cpassword,
        code:state.logonReducer.code,
        codeText:state.logonReducer.codeText,
        end:state.logonReducer.end,
    }
}

export default connect(mapStateToProps)(Logon);