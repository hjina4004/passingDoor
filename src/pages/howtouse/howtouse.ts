import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Navbar } from 'ionic-angular';

/**
 * Generated class for the HowtousePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-howtouse',
  templateUrl: 'howtouse.html',
})
export class HowtousePage {

  @ViewChild(Navbar) navbar: Navbar;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HowtousePage');

    this.navbar.backButtonClick = (e:UIEvent) => {
      let navOptions = {
        animation: 'ios-transition'
      };
      this.navCtrl.pop(navOptions);
    }
  }

}
