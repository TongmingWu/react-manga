import React,{PropTypes} from 'react'
require('../css/EditText.less')

class EditText extends React.Component{
    constructor(props){
        super(props);
    }

    handleChange(ev){
        let value = ev.target.value;
        let del = document.getElementById(this.props.id).lastChild;
        if(value.length>0){
            del.style.display = 'block';
        }else{
            del.style.display = 'none';    
        }
        this.props.onChange(this,this.props.id,value);
    }

    handleClear(ev){
        let del = document.getElementById(this.props.id).lastChild;
        let input = document.getElementById(this.props.id).firstChild;
        input.value = '';
        del.style.display = 'none';
        this.props.onClear(ev);
    }

    render(){
        return(
            <div id={this.props.id} className='edit-text'>
                <input type={this.props.type} placeholder={this.props.placeholder}
                onChange={this.handleChange.bind(this)} name={this.props.name}
                value={this.props.value}/>
                <div className='del' style={{
                    display:this.props.value ===''?'none':'block'
                }} onTouchEnd={this.handleClear.bind(this)}/>
            </div>
        )
    }
}

EditText.PropTypes = {
    id:PropTypes.string.isRequired,
    type:PropTypes.string.isRequired,
    placeholder:PropTypes.string.isRequired,
    onChange:PropTypes.func.isRequired,
    onClear:PropTypes.func.isRequired,
    value:PropTypes.string.isRequired,
}

EditText.defaultProps = {
    id:'',
    type:'text',
    placeholder:'',
    onChange:(value)=>{},
    onClear:()=>{},
    value:''
}

export default EditText;