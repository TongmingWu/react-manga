import React, {PropTypes} from 'react'
import BaseView from './BaseView'
import {connect} from 'react-redux'
import Toolbar from '../components/Toolbar'
import ComicGrid from '../components/ComicGrid'
import {fetchHistory} from '../actions/index'
import Promise from 'promise-polyfill'
import {openSQLHelper,selectAllHistory,HISTORY_TABLE,HISTORY_CHAPTER_TABLE} from '../db/DBManager'

class History extends BaseView{
    constructor(props){
        super(props);
        if(!window.Promise){
            window.Promise = Promise;
        }
    }

    getData(){
        let db = openSQLHelper()
        new Promise((resolve,reject)=>{
            selectAllHistory(db,HISTORY_TABLE,(result)=>{
                let items = [];
                let length = result.rows.length;
                for(let i = 0 ; i<length; i++){
                    items.push(result.rows.item(i))
                }
                resolve(items);
            })
        }).then(comics=>{
            //配对
            selectAllHistory(db,HISTORY_CHAPTER_TABLE,(chapters)=>{
                let items = [];
                for(let i = 0; i<comics.length;i++){
                    for(let j = 0;j<chapters.rows.length;j++){
                        if(comics[i].comic_url===chapters.rows.item(j).comic_url){
                            items.push(comics[i])
                            break;
                        }
                    }
                }
                this.props.dispatch(fetchHistory(items))                
            })
        }).catch(error=>{
            console.log(error)
        })
    }

    render(){
        return(
            <div>
                <Toolbar title='历史记录'/>
                <div style={{paddingTop: '4rem'}}></div>
                <ComicGrid comics={this.props.items}/>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        items:state.historyReducer.items,
    }
}

History.PropTypes = {
    items:PropTypes.array.isRequired,
}

History.defaultProps = {
    items:[],
}

export default connect(mapStateToProps)(History);
