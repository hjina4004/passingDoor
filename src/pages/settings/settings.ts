import { MemberProvider } from './../../providers/member/member';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';

import { Settings } from '../../providers/providers';

/**
 * The Settings page is a simple form that syncs with a Settings provider
 * to enable the user to customize settings for the app.
 *
 */
@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

  constructor(public navCtrl: NavController,
    public settings: Settings,
    public navParams: NavParams,
    public http:Http, 
    private storage: Storage,
    private mem: MemberProvider) {
  }

  notice(){
    this.navCtrl.push('NoticePage', {}, {
      animate: true,
      direction: 'forward'
    });
  }

  logout(){

    let logoutData = "key=dltmf&uid="+this.storage.get('member_id')+"&tokenid="+this.storage.get('tokenid');

    this.mem.logout(logoutData).then(data => {
        alert(data);
        this.storage.clear();
        this.navCtrl.setRoot('WelcomePage');
    });

    // let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    //   let options = new RequestOptions({ headers: headers }); 

    //   this.storage.get('member_id').then(data => {
    //     alert('member_id = '+data);
    //     let member_id = data;
      
    //     let logoutData = "key=dltmf&uid="+member_id+"&tokenid="+this.storage.get('tokenid');
    //     alert(logoutData);
  
    //     return new Promise((resolve, reject) => {
    //       this.http.post('http://192.168.10.140:8080/lmtalk-manager/api/json/logout.php', logoutData, options)
    //       //.toPromise()
    //       //.then((response) =>{
    //       .map( res => res.json())
    //       .subscribe (res => {
    //         this.storage.clear();
    //         alert('로그아웃 되었습니다.');
    //       }, (error) =>{
    //         let errors = [];
    //         errors.push(error);
    //         reject(errors);
    //       });
    //     });
    
    //   });
  } // logout END

  howtouse(){
    this.navCtrl.push('HowtousePage', {}, {
      animate: true,
      direction: 'forward'
    });
  }

  
}
