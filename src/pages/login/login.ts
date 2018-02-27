import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { User } from '../../models/user';

import { GlobalFunction } from '../../providers/global-function';
import { AngularFireAuth } from 'angularfire2/auth';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  member = {} as User;

  constructor (
    private afAuth: AngularFireAuth,
    private globalFunction: GlobalFunction
  ) {}

  login () {
    this.afAuth.auth.signInWithEmailAndPassword(this.member.email, this.member.password)
    .then((auth) => {
      console.log(auth);
      this.globalFunction.presentToast(auth.email + '님, 환영합니다.', 3000);
    }).catch((err) => {
      this.globalFunction.presentToast(err.message, 3000);
    })
  }

  signup () {
  }

  find () {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
}
