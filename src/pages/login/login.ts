import { Component, ViewChild } from '@angular/core';
import { IonicPage, Navbar } from 'ionic-angular';
import { User } from '../../models/user';

import { GlobalFunction } from '../../providers/global-function';
import { AngularFireAuth } from 'angularfire2/auth';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  @ViewChild(Navbar) navBar: Navbar;

  member = {} as User;
  usr_message = {
    not_reg_email: "등록되지 않은 이메일입니다.",
    send_reset_password: "이메일을 확인하셔서, 비밀번호를 재설정 하십시오."
  };

  constructor(
    private afAuth: AngularFireAuth,
    private globalFunction: GlobalFunction
  ) {}

  login() {
    this.afAuth.auth.signInWithEmailAndPassword(this.member.email, this.member.password)
    .then((auth) => {
      console.log(auth);
      this.globalFunction.moveRoot('WelcomePage', {});
    }).catch((err) => {
      console.log(err);
      this.globalFunction.presentToast(err.message, 3000);
    });
  }

  signup() {
    this.globalFunction.moveTo('SignupPage', {});
  }

  resetPassword() {
    var re = new RegExp("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$");
    let input = this.member.email;
    let pattern = re.test(input);
    if (!pattern) {
      this.globalFunction.presentToast(this.usr_message.not_reg_email, 3000);
    } else {
      return this.afAuth.auth.sendPasswordResetEmail(this.member.email)
        .then(() => {
          console.log('sent Password Reset Email!');
          this.globalFunction.presentToast(this.usr_message.send_reset_password, 3000);
        }).catch((error) => {
          console.log(error);
          if (error.code == "auth/user-not-found") {
            this.globalFunction.presentToast(this.usr_message.not_reg_email, 3000);
          }
        });
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    this.navBar.backButtonClick = () => {this.globalFunction.moveBack();}
  }
}
