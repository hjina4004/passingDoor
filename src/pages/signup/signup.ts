import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Navbar } from 'ionic-angular';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  @ViewChild(Navbar) navbar: Navbar;
  
  member = {
    member_id: "",
    member_name: "",
    member_pw: "",
    member_pwCheck: "",
    member_email: ""
  };

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');

    this.navbar.backButtonClick = (e:UIEvent) => {
      let navOptions = {
        animation: 'ios-transition'
      };
      this.navCtrl.pop(navOptions);
    }
  }

}
