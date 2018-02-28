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

  constructor(
    private afAuth: AngularFireAuth,
    private globalFunction: GlobalFunction
  ) {}

  login() {
    this.afAuth.auth.signInWithEmailAndPassword(this.member.email, this.member.password)
    .then((auth) => {
      console.log(auth);
      this.globalFunction.moveRoot('WelcomePage',{});
    }).catch((err) => {
      this.globalFunction.presentToast(err.message, 3000);
    })
  }

  signup() {
    this.globalFunction.moveTo('SignupPage',{});
  }

  find() {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    this.navBar.backButtonClick = () => {this.globalFunction.moveBack();}
  }
}
