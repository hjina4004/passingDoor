import { MemberProvider } from '../../providers/member/member';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, Navbar} from 'ionic-angular';
import { Storage } from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  @ViewChild(Navbar) navbar: Navbar;

  members = [];
  member = {
    member_id: "", 
    member_pw: ""
  };

  reason = {
    val: ''
  };

  recieveData: {m_id: string, m_pw: string, force: string, result: {success: number, id: string, tokenid: string}};

  constructor(public navCtrl: NavController, public mem: MemberProvider, private storage: Storage) {

  }

  login() {

    if (this.member.member_id == ''){
      this.reason.val = '아이디를 입력해주세요.';
    } else if (this.member.member_pw == ''){
      this.reason.val = '비밀번호를 입력해주세요.';
    }

    let loginData = "key=dltmf&force=1&memberId="+this.member.member_id+"&memberPw="+this.member.member_pw;
    //let loginData = {key:'dltmf', force: '1', memberId: this.member.member_id, memberPw: this.member.member_pw};

    this.mem.login(loginData).then(data => {
      this.recieveData = JSON.parse(JSON.stringify(data));
      alert('success : '+JSON.stringify(data));
      

      if (this.recieveData.result.success == 1){
        this.storage.set('member_id', this.recieveData.m_id);
        this.storage.set('tokenid', this.recieveData.result.tokenid);

        this.navCtrl.pop();

      } else if (this.recieveData.result.success == 10){
        this.reason.val = '이미 로그인된 아이디입니다.';
        //alert('이미 로그인된 아이디입니다.');
      } else {
        this.reason.val = '아이디 또는 비밀번호가 틀렸습니다.';
        //alert('아이디 또는 비밀번호가 틀렸습니다.');
      }
    },
    (error) => {
        alert('error : '+JSON.stringify(error));
    });
  }


  //   if (this.member.member_id == ''){
  //     this.reason.val = '아이디를 입력해주세요.';
  //   } else if (this.member.member_pw == ''){
  //     this.reason.val = '비밀번호를 입력해주세요.';
  //   } else {

  //     let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
  //     let options = new RequestOptions({ headers: headers }); 

  //     let loginData = "key=dltmf&force=1&memberId="+this.member.member_id+"&memberPw="+this.member.member_pw;

  //     return new Promise((resolve, reject) => {
  //       this.http.post('http://192.168.10.140:8080/lmtalk-manager/api/json/login.php', loginData, options)
  //       //.toPromise()
  //       //.then((response) =>{
  //       .map( res => res.json())
  //       .subscribe (res => {
  //         alert(JSON.stringify(res));
  //         if (res.result.success == '1'){
  //           this.storage.set('member_id', res.m_id);
  //           this.storage.set('tokenid', res.result.tokenid);

  //           this.navCtrl.pop();

  //         } else if (res.result.success == '10'){
  //           this.reason.val = '이미 로그인된 아이디입니다.';
  //           //alert('이미 로그인된 아이디입니다.');
  //         } else {
  //           this.reason.val = '아이디 또는 비밀번호가 틀렸습니다.';
  //           //alert('아이디 또는 비밀번호가 틀렸습니다.');
  //         }
  //       //.map( res => res.json())
  //       //.subscribe (res => {
  //       //  alert("success:" +res.result.success);
  //         //this.storage.set('member_id', res.member_id);
  //       }, (error) =>{
  //         let errors = [];
  //         errors.push(error);
  //         reject(errors);
  //         //alert("failed: "+JSON.stringify(err));
  //       });
  //     });
  //   } // else END
  // } // login END

  signup(){
    let navOptions = {
      animation: 'ios-transition'
    };
    this.navCtrl.push('SignupPage', {}, navOptions);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NoticePage');

    this.navbar.backButtonClick = (e:UIEvent) => {
      let navOptions = {
        animation: 'ios-transition'
      };
      this.navCtrl.pop(navOptions);
    }
  }

}