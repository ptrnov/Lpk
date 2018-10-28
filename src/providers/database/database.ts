// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { SQLite,SQLiteObject } from '@ionic-native/sqlite';
import { Platform,Events } from 'ionic-angular';
import {GET_STRING_TABLE} from "./tabel";
import {getJabatan,getPolda,getPolwil} from "./data";

const DB_NAME: string = 'korlantas.db';
const win: any = window;

@Injectable()
export class DatabaseProvider {
  private database: SQLiteObject;
  private getStrTable:any;
  private _db: any;


  constructor(
    public http: Http,
    public storage: SQLite,
    private platform: Platform,
    public events: Events
  ) {
    console.log("init provider db");
    this.getStrTable = GET_STRING_TABLE;
     /* Split platform SQLite or WebSql
    * SQLite   : Live Mobile Storage.
    * WebSql   : Develompent debug database,table,query.
    * Author   : ptr.nov@gmail.com
    * Metode   : 1. Create DB; 2. GetApi->(insert/update data).
    */
   this.platform.ready().then(() => {
        console.warn('platform Indentification');
        if (this.platform._platforms[0] == 'cordova') {
            console.warn('Storage: Sqlite cordova/Mobile Flatform - Create DB ');
            this.storage = new SQLite;
            this.storage.create({ name: DB_NAME ,location:"default" }).then( ( db: SQLiteObject ) => {
              this.database = db;
              /**
                * CREATE TABLE WITH ARRAY SQLSTR
              */
              this.getStrTable.forEach(element => {
                if (this.getStrTable.length > 0){
                  // console.log(element);
                  this.createTable(element.TABEL,[]);
                  this.createTable(element.UNIQUE,[]);
                }else{
                  console.log("SQL Definition Not Exist")
                }
              });
            }).catch((error) => {
              console.log(error);
            });
        } else {
            console.warn('Storage: WebSql Browser Flatform');
            this._db = win.openDatabase(DB_NAME, '1.0', '', 5 * 1024 * 1024);
            /**
             * CREATE TABLE WITH ARRAY SQLSTR
             */
            this.getStrTable.forEach(element => {
              if (this.getStrTable.length > 0){
                // console.log(element);
                this.createTable(element.TABEL,[]);
                this.createTable(element.UNIQUE,[]);
              }else{
                console.log("SQL Definition Not Exist")
              }
            });
        }
      });

  }

  public initProvider():void{
    console.log("log database");
  }
  /* Pungsi Create Table untuk WebSql Browser & Sqlite Cordova
  * tabel    : adalah tabel yang sudah di create sebelumnya.
  * querySql : Sql Query Syntak
  * Author   : ptr.nov@gmail.com
  */
  public createTable(querySql: string,value:any){
  console.warn('Function Create Table');
  //return new Promise((resolve)=>{
    //  this.platform.ready().then(() => {
      if (this.platform._platforms[0] == 'cordova') {
        // return new Promise((resolve, reject)=>{
          console.log('Sqlite cordova/Mobile Flatform' + querySql);
          /* inser sqlite query */
          //return new Promise((resolve, reject)=>{
            let sql =querySql;
            // this.storage.create({ name: DB_NAME ,location:"default" }).then(( db: SQLiteObject ) => {
              this.database.executeSql(sql,value).then((data)=>{
                console.log('Suceess Create Table');
                // resolve(data);
              }).catch((error) => {
                console.log(error);
              });
            // });

          //});
      //  });
      }else{
         /* inser websql query */
        //return new Promise((resolve, reject)=>{
          //console.log('WebSql Browser Flatform');
          console.log('WebSql Browser Flatform to Function Create Table');
          let sql = querySql;
          this._db.transaction(function (tx) {
            tx.executeSql(sql,[],function(tx,results ) {
              console.log('Suceess Create Table');
              // console.log('return=' +  results.rows.item);
             // resolve(results);
            });
          });
        //});
      }
    //});
  //  });
  }

  public insertData(querySql:string,bindings:any=[]) {
      bindings = typeof bindings !== 'undefined' ? bindings : [];
      // return new Promise((resolve, reject)=>{
      //   this.platform.ready().then(() => {
          console.log('platform Insert Indentification');
          if (this.platform._platforms[0] == 'cordova') {
              console.log('Sqlite on device CordovaMobile, Command=' + querySql);
              // return new Promise((resolve, reject)=>{
                /* inser sqlite query */
                  // var sql =querySql;
                  // this.storage.create({ name: DB_NAME ,location:"default" }).then( ( db: SQLiteObject ) => {
                    return new Promise((resolve, reject)=>{
                      var srcRsltData=this.database.executeSql(querySql,bindings);
                        srcRsltData.then((data)=>{
                           console.log(data);
                          resolve(true);
                        //   //statusSave=true;
                            // return true;
                        });
                      });

                //  });

              // });
          }else{
            // return new Promise((resolve, reject)=>{
              console.log('WebSql Browser Flatform');
              let sql = querySql;
              this._db.transaction(function (tx) {
                tx.executeSql(sql,bindings);
                return true;
              },function (error) {
                  return false;
                  // console.log(error);
                  // console.log(error.code);
                  // console.log(error.message);
                  // resolve(error);
                  // statusSave=true;
              });
          }
          // return statusSave;
      //   })
      // });
    }

    /* Pungsi Select All Data untuk WebSql Browser & Sqlite Corddova
    * tabel    : adalah tabel yang sudah di create sebelumnya.
    * querySql : Sql Query Syntak
    * Author   : ptr.nov@gmail.com
    * Promise  : Resolve data
    * var querySql ="SELECT id, usr FROM piter ORDER BY id DESC";
      this.database.selectData(querySql,[]).then((data)=>{
        console.log(data);
        this.ListUser= data;
      });
    * ListUser deklarasi  private ListUser: any;
    * ListUser send to html
    */
    public selectData(querySql){
      var aryRsltInternal=[];
      return new Promise((resolve, reject)=>{
        this.platform.ready().then(() => {
          if (this.platform._platforms[0] == 'cordova') {
              console.log('START_SELECT-MODUL');
              console.log('Flatform - CordovaMobile Sqlite');
              console.log('COMMAND="' + querySql + '"');
              let srcRsltData=this.database.executeSql(querySql,[]);
              srcRsltData.then((results) => {
                if(results.rows.length > 0) {
                  for(let i = 0; i < results.rows.length; i++) {
                    var item = results.rows.item(i);
                    for (var key in item) {
                      item[key] = item[key];
                    }
                    aryRsltInternal.push(item);
                      //== MANUAL COSTUMIZE===
                      // aryRsltInternal.push({
                      //   NAME: results.rows.item(i).NAME,
                      //   SUMMARY: results.rows.item(i).SUMMARY,
                      //   COMPANY: results.rows.item(i).COMPANY
                      // });
                  };
                  console.log(aryRsltInternal);
                  console.log('END_SELECT-MODUL: Show_Data');
                  resolve(aryRsltInternal);
                }else{
                  console.log('END_SELECT-MODUL: No_Data');
                  resolve([]);
                }
                //console.log(JSON.stringify(aryRslt2));
              },(error)=>{
                   console.log(error);
              }).catch(e => console.log(e));
          }else{
              this._db.transaction(function (tx){
                  console.log('Flatform - WebSql Browser');
                  console.log('START_SELECT-MODUL');
                  console.log('COMMAND="' + querySql + '"');
                  tx.executeSql(querySql,[], function(tx, results) {
                      if(results.rows.length > 0) {
                        for(let i = 0; i < results.rows.length; i++) {
                            var item = results.rows.item(i);
                            for (var key in item) {
                              item[key] = item[key];
                            }
                            aryRsltInternal.push(item);
                        }
                        console.log(aryRsltInternal);
                        console.log('END_SELECT-MODUL: Show_Data');
                        resolve(aryRsltInternal);
                      }else{
                        console.log('END_SELECT-MODUL: No-Data');
                        resolve([]);
                      }
                  },function(tx, error){
                    resolve(error);
                  });
              });
          }
        });
      });
  }

  public setAdministrator(){
    var qry="INSERT INTO user (id,username,password,nama,jabatan,polda,polwil) VALUES (?,?,?,?,?,?,?)";
    this.insertData(qry,[
      '0001',
      'administrator',
      'password',
      'Adminstrator',
      'Jenderal Pol',
      'MetroJaya',
      'Mabes'
    ]);
  }

  public aryJabatan(){
    return getJabatan;
  }

  public aryPolda(){
    return getPolda;
  }
  public aryPolwil(namePolda){
    var getIdPolda;
    var ary=[];
    getIdPolda = getPolda.findIndex((obj => obj.polda == namePolda));

    if (getIdPolda>=0){
      console.log("check id=",getIdPolda);
      // console.log("your is=",getPolda[objIndex].id);
      // getIdPolda= getPolda[objIndex].id;
      ary.push(getPolwil.filter(function(obj){
          return obj.id_polda==getIdPolda;
      }));
    }else{
      ary.push(getPolwil.filter(function(obj){
          return obj.id_polda=='0';
      }));
    }

    this.events.publish('publisPolwil',ary[0]);
    return ary[0];
  }
}
