import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Navbar } from 'ionic-angular';

/**
 * Generated class for the YearPaperPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-year-paper',
  templateUrl: 'year-paper.html',
})
export class YearPaperPage {

  @ViewChild(Navbar) navbar: Navbar;

  title = {
    val: ''
  };

  page = {
    val1: '2017',
    val2: '2016',
    val3: '2015',
    val4: '2014',
    val5: '2013',
    val6: '2012',
  }

  budongsan = this.navParams.get('subTitle1');
  minbeop = this.navParams.get('subTitle2');

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad YearPaperPage');

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
