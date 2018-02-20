import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { SQLitePorter } from '@ionic-native/sqlite-porter';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/Rx';
import { Storage } from '@ionic/storage';

/*
  Generated class for the AutocompleteDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AutocompleteDataProvider {

  database: SQLiteObject;
  private databaseReady: BehaviorSubject<boolean>;

  constructor(public sqlitePorter: SQLitePorter, private storage: Storage, private sqlite: SQLite, private platform: Platform, private http: Http) {
    console.log('Hello AutocompleteDataProvider Provider');

    this.databaseReady = new BehaviorSubject(false);
    this.platform.ready().then(() => {
      this.sqlite.create({
        // name: 'autocompletedata.db',
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
    // this.http.get('assets/autocompletedata.sql')
    //   .map(res => res.text())
    //   .subscribe(sql => {
    //     this.sqlitePorter.importSqlToDb(this.database, sql)
    //       .then(data => {
    //         this.databaseReady.next(true);
    //         this.storage.set('database_filled', true);
    //         alert('init성공');
    //       })
    //       .catch(e => {
    //         console.error(e);
    //         alert('init실패');
    //       });
    //   });
  } // init END

  autocomplete(keyword):Promise<any>{
    let autoKeyword = [this.getSearchKeyword(keyword)];

    return new Promise ((resolve, reject) => {
      // let sql = "SELECT searchWord FROM autocompletedata WHERE consonant LIKE '%'||?||'%' OR searchWord LIKE '%'||?||'%'";
      let sql = "SELECT content AS searchWord FROM minbeop WHERE content LIKE '%'||?||'%' AND obj_item = '0' Limit 10";
      this.database.executeSql(sql,autoKeyword).then( (data) => {
        let getautoData = [];
        if (data.rows.length > 0) {
          for (var i = 0; i < data.rows.length; i++) {
            getautoData.push ({ searchWord: data.rows.item(i).searchWord });
          }
        }
        // alert("autocomplete:"+JSON.stringify(getautoData));
        resolve(getautoData);
      }, (error) => {
        let errors = [];
        errors.push(error);
        // alert("autocomplete error:"+JSON.stringify(errors));
        reject(errors);
      });
    });
  }

  getDatabaseState() {
    return this.databaseReady.asObservable();
  }

  /**
  * 한글 정 글자 가져오기
  *
  * @param addr 검색어
  * @return 한글 정 글자
  */
  getSearchKeyword(addr) {
    let retString = "";
    for (let i = 0; i < addr.length; i++)
    {
      if (!this.isKoreanHead(addr.substring(i, i+1))){
        //한글 초성 글자가 아니라면 문자열 추가
        retString += addr.substring(i, i+1);
      }
    }
    return retString;
  }

  /**
  * 한글 초성 글자 가져오기
  *
  * @param addr 검색어
  * @return 한글 초성 글자
  */
  getSearchKeywordHead(addr) {
    let retString = "";
    for (let i = 0; i < addr.length; i++) {
      if(this.isKoreanHead(addr.substring(i, i+1))){
        //한글 초성 글자이면 문자열 추가
        retString = addr.substring(i, i+1);
        break;
      }
    }
    return retString;
  }

  /**
  * 글자가 한글 초성인지 여부 확인
  * @param data 체크할 글자
  * @return 한글여부
  */
  isKoreanHead(data){
    let p = /[ㄱ-ㅎ]/;
    let m = data.match(p);
    if (m) {
      return true;
    } else {
      return false;
    }
  }


  /**
  * 검색조건 동적 SQL 가져오기
  *
  * @param searchKeyword 검색어 한글 정 글자
  * @param searchKeywordHead 검색어 한글 초성 글자
  * @param columnName 컬럼명
  * @return SQL
  */
  getSearchDynamicSql(searchKeyword, searchKeywordHead, columnName) {
    let startChar = "";
    let endChar = "";
    if(searchKeywordHead == "ㄱ" || searchKeywordHead == "ㄲ"){
      startChar = "가";
      endChar = "나";
    }else if(searchKeywordHead == "ㄴ"){
      startChar = "나";
      endChar = "다";
    }else if(searchKeywordHead == "ㄷ" || searchKeywordHead == "ㄸ"){
      startChar = "다";
      endChar = "라";
    }else if(searchKeywordHead == "ㄹ"){
      startChar = "라";
      endChar = "마";
    }else if(searchKeywordHead == "ㅁ"){
      startChar = "마";
      endChar = "바";
    }else if(searchKeywordHead == "ㅂ" || searchKeywordHead == "ㅃ"){
      startChar = "바";
      endChar = "사";
    }else if(searchKeywordHead == "ㅅ" || searchKeywordHead == "ㅆ"){
      startChar = "사";
      endChar = "아";
    }else if(searchKeywordHead == "ㅇ"){
      startChar = "아";
      endChar = "자";
    }else if(searchKeywordHead == "ㅈ" || searchKeywordHead == "ㅉ"){
      startChar = "자";
      endChar = "차";
    }else if(searchKeywordHead == "ㅊ"){
      startChar = "차";
      endChar = "카";
    }else if(searchKeywordHead == "ㅋ"){
      startChar = "카";
      endChar = "타";
    }else if(searchKeywordHead == "ㅌ"){
      startChar = "타";
      endChar = "파";
    }else if(searchKeywordHead == "ㅍ"){
      startChar = "파";
      endChar = "하";
    }else if(searchKeywordHead == "ㅎ"){
      startChar = "하";
      endChar = null;
    }else{
      return "";
    }
    return this.getSql(searchKeyword, startChar, endChar, columnName);
  }

  /**
  * 키워드가 없는 SQL 가져오기
  *
  * @param str 정규문자
  * @param str2 시작글자
  * @param str3 끝글자
  * @param columnName 해당 컬럼명
  * @return SQL
  */
  getSql(str, str2, str3, columnName) {
    if (str3 == null) {
      return "(" + columnName + " >= '" + str + str2 + "')";
    } else {
      return "(" + columnName + " >= '" + str + str2 + "' AND " + columnName + " < '" + str + str3 + "')";
    }
  }

}
