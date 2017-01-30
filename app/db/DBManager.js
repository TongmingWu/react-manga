import Promise from 'promise-polyfill'

export const DB_NAME = 'db_comic'
export const VERSION = '1.0'
export const DB_DESC = '漫画本地数据库'
export const HISTORY_TABLE = 'history'
export const HISTORY_CHAPTER_TABLE = 'history_chapter'

if(!window.Promise){
    window.Promise = Promise;
}

//TODO IOS方面出现问题

export function openSQLHelper(){
    let db = openDatabase(
        DB_NAME,
        '',
        DB_DESC,
        1024*1024,
        ()=>{
            console.log('创建成功');
        }
    )
    createTable(db);
    return db;
}

export function createTable(db){
    db.transaction((tx)=>{
        // tx.executeSql('drop table history')
        // tx.executeSql('drop table history_chapter')
        tx.executeSql('create table if not exists history ('+
            'comic_name,'+
            'comic_url,'+
            'comic_author,'+
            'comic_source,'+
            'cover,'+
            'last_time'+
        ')')
        tx.executeSql('create table if not exists history_chapter ('+
            'comic_url,'+
            'chapter_url,'+
            'chapter_title'+
        ')')
},(msg)=>{
    console.log(msg);
})
}

export function recordHistoryComic(comic){
    let db = openSQLHelper();
    new Promise((resolve,reject)=>{
        insertHistoryIfNeed(db,HISTORY_TABLE,comic.comic_url,resolve)
    })
    .then(isNeed=>{
        if(isNeed){
            insertHistoryComic(db,comic);
        }else{
            updateHistoryComic(db,comic.comic_url);
        }
    }).catch(error=>{
        console.log(error);
    })
}

export function recordHistoryChapter(chapter){
    let db = openSQLHelper();
    new Promise((resolve,reject)=>{
        insertHistoryIfNeed(db,HISTORY_CHAPTER_TABLE,chapter.comic_url,resolve)
    })
    .then(isNeed=>{
        if(isNeed){
            insertHistoryChapter(db,chapter);
        }else{
            updateHistoryChapter(db,chapter);
        }
    }).catch(error=>{
        console.log(error);
    })
}

function insertHistoryIfNeed(db,table,url,resolve){
    if(!db){
        throw new SyntaxError('db can not be null!');
    }
    selectHistory(db,table,url,(result)=>resolve(!result.rows.length>0));    
}

function insertHistoryComic(db,comic){
    db.transaction((tx)=>{
        tx.executeSql('insert into history ("comic_name","comic_url","comic_author",'+
        '"comic_source","cover","last_time"'+
        ') values (?,?,?,?,?,?)',
        [comic.comic_name,comic.comic_url,comic.comic_author,comic.comic_source,comic.cover,new Date().getTime()],
        (tx,result)=>{
            // console.log('成功')
        },(tx,error)=>{
            console.log(error)
        })
    })
}

function updateHistoryComic(db,url){
    db.transaction(tx=>{
        tx.executeSql(`update history set last_time=${new Date().getTime()} where comic_url="${url}"`,
        [],
        (tx,result)=>{
            // console.log('成功')
        },(tx,error)=>{
            console.log(error)
        })
    })
}

function insertHistoryChapter(db,chapter){
    db.transaction(tx=>{
        tx.executeSql('insert into history_chapter ("comic_url","chapter_url","chapter_title")'+
        ' values (?,?,?)',[chapter.comic_url,chapter.chapter_url,chapter.chapter_title],
        (tx,result)=>{
            console.log('成功')
            // alert('成功')
        },(tx,error)=>{
            console.log(error)
        })
    })
}

function updateHistoryChapter(db,chapter){
    db.transaction(tx=>{
        tx.executeSql(`update history_chapter set chapter_title="${chapter.chapter_title}", chapter_url="${chapter.chapter_url}"`+
        `where comic_url="${chapter.comic_url}"`,
        [],
        (tx,result)=>{
            console.log('成功')
            // alert('成功')
        },(tx,error)=>{
            console.log(error)
        })
    })
}

export function selectHistory(db,table,url,callback){
    db.transaction(tx=>{
        tx.executeSql(`select * from ${table} where comic_url="${url}"`,[],(tx,result)=>{
            // console.log(result)
            return callback(result);
        },(tx,error)=>console.log(error))
    })
}

export function selectAllHistory(db,table,callback){
    db.transaction(tx=>{
        let sql = `select * from ${table}`
        if(table===HISTORY_TABLE){
            sql = `select * from ${table} order by last_time desc`
        }
        tx.executeSql(sql,[],(tx,result)=>{
            // console.log(result)
            return callback(result);
        },(tx,error)=>console.log(error))
    })
}