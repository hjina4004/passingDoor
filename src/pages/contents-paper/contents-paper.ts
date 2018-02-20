import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Navbar } from 'ionic-angular';

/**
 * Generated class for the ContentsPaperPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contents-paper',
  templateUrl: 'contents-paper.html',
})
export class ContentsPaperPage {

  @ViewChild(Navbar) navbar: Navbar;

  title = {
    val: ''
  };

  budongsan = this.navParams.get('subTitle1');
  minbeop = this.navParams.get('subTitle2');

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContentsPaperPage');

    this.navbar.backButtonClick = (e:UIEvent) => {
      let navOptions = {
        animation: 'ios-transition'
      };
      this.navCtrl.pop(navOptions);
    }

    if (this.budongsan){
      this.title.val = this.budongsan;
    } else if (this.minbeop){
      this.title.val = this.minbeop;
    }
  }


}
