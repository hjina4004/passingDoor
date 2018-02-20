import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { SQLitePorter } from '@ionic-native/sqlite-porter';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/Rx';
import { Storage } from '@ionic/storage';

/*
  Generated class for the MinbeopProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MinbeopProvider {
  database: SQLiteObject;
  private databaseReady: BehaviorSubject<boolean>;

  constructor(public sqlitePorter: SQLitePorter, private storage: Storage, private sqlite: SQLite, private platform: Platform, private http: Http) {
    console.log('Hello MinbeopProvider Provider');

    this.databaseReady = new BehaviorSubject(false);
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'minbeop.db',
        location: 'default'
      })
        .then((db: SQLiteObject) => {
          this.database = db;
          this.storage.get('database_filled').then(val => {
            if (val) {
              this.databaseReady.next(true);
            } else {
              this.init();
            }
          });
        });
    });
  } // constructor END

  init() {
    this.http.get('assets/minbeop.sql')
      .map(res => res.text())
      .subscribe(sql => {
        this.sqlitePorter.importSqlToDb(this.database, sql)
          .then(data => {
            this.databaseReady.next(true);
            this.storage.set('database_filled', true);
          })
          .catch(e => {
            console.error(e);
          });
      });
  } // init END

  getAllMinbeop():Promise<any> {
    return new Promise ((resolve, reject) => {
      let sql = "SELECT * FROM minbeop COMPANY LIMIT 5";
      this.database.executeSql(sql, []).then( (data) => {
        let minbeop = [];
        if (data.rows.length > 0) {
          for (var i = 0; i < data.rows.length; i++) {
            minbeop.push({ no: data.rows.item(i).no,
                          year: data.rows.item(i).year,
                          times: data.rows.item(i).times,
                          subject: data.rows.item(i).subject,
                          req: data.rows.item(i).req,
                          obj_item: data.rows.item(i).obj_item,
                          m_key: data.rows.item(i).m_key,
                          content: data.rows.item(i).content,
                          correct: data.rows.item(i).correct,
                          level: data.rows.item(i).level,
                          OX: data.rows.item(i).OX,
                          note_keyword: data.rows.item(i).note_keyword,
                         });
          }
        }
        resolve(minbeop);
      }, (error) => {
        let errors = [];
        errors.push(error);
        reject(errors);
      });
    });
  }

  searchMinbeop(keyword){
    let searchData = [keyword]; 

    return new Promise ((resolve, reject) => {
      let sql = "SELECT year, times, req, m_key FROM minbeop WHERE content LIKE '%'||?||'%' AND obj_item = '0' LIMIT 5"; // ||->concat
      this.database.executeSql(sql,searchData).then( (data) => {
      let getSearchData = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          getSearchData.push ({ year: data.rows.item(i).year, 
                                times: data.rows.item(i).times, 
                                req: data.rows.item(i).req,
                                m_key: data.rows.item(i).m_key});
        }
      }
        resolve(getSearchData);
      }, (error) => {
        reject(error);
      });
    });
  }

  getExam(m_key){
    let examData = [m_key];

    return new Promise ((resolve, reject) => {
      let sql = "SELECT year, times, req, content FROM minbeop WHERE m_key LIKE ?||'%'";
      this.database.executeSql(sql,examData).then( (data) => {
        let getExamData = [];
        if (data.rows.length > 0) {
          for (var i = 0; i < data.rows.length; i++) {
            getExamData.push ({ year: data.rows.item(i).year, 
                                times: data.rows.item(i).times,
                                req: data.rows.item(i).req,
                                content: data.rows.item(i).content });
          }
        }
          resolve(getExamData);
        }, (error) => { alert('실패'+JSON.stringify(error));
          reject(error);
        });
      });
    }
 
  getDatabaseState() {
    return this.databaseReady.asObservable();
  }

} // export class MinbeopProvider END
