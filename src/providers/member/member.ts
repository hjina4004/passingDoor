import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { Api } from '../api/api';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the MemberProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MemberProvider {

  constructor(public api: Api,
    private http: Http) { }

  login(loginData: any){

    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers }); 

    //let loginData = "key=dltmf&force=1&memberId="+this.memberInfo.+"&memberPw="+this.member.member_pw;

    return new Promise((resolve, reject) => {
    this.http.post('http://192.168.10.140:8080/lmtalk-manager/api/json/login.php', loginData, options)
    // .toPromise()
    // .then((response) =>{
    //   resolve(response);

    .map( res => res.json())
    .subscribe ((res) => {
      resolve(res);
      //   alert(JSON.stringify(res));
      //   if (res.result.success == '1'){
      //   this.storage.set('member_id', res.m_id);
      //   this.storage.set('tokenid', res.result.tokenid);

      //   } else if (res.result.success == '10'){
      //  // this.reason.val = '이미 로그인된 아이디입니다.';
      //   alert('이미 로그인된 아이디입니다.');
      //   } else {
      //   //this.reason.val = '아이디 또는 비밀번호가 틀렸습니다.';
      //   alert('아이디 또는 비밀번호가 틀렸습니다.');
      //   }

    //.map( res => res.json())
    //.subscribe (res => {
    //  alert("success:" +res.result.success);
        //this.storage.set('member_id', res.member_id);
    }, (error) =>{
        let errors = [];
        errors.push(error);
        reject(errors);
        //alert("failed: "+JSON.stringify(err));
    });
    });

  } // login END

  logout(logoutData: any){

    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers }); 

    return new Promise((resolve, reject) => {
    this.http.post('http://192.168.10.140:8080/lmtalk-manager/api/json/logout.php', logoutData, options)

    .map( res => res.json())
    .subscribe ((res) => {
      resolve(res);
    }, 
      (error) =>{
      let errors = [];
      errors.push(error);
      reject(errors);
    });
    });
  } // logout END

}
