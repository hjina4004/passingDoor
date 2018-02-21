import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Navbar } from 'ionic-angular';

/**
 * Generated class for the ContentsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contents',
  templateUrl: 'contents.html',
})
export class ContentsPage {

  @ViewChild(Navbar) navbar: Navbar;

  title = {
    val: ''
  };

  subject = {
    title1: '부동산학개론',
    title2: '민법 및 민사특별법'
  };

  contents = this.navParams.get('contents');
  year = this.navParams.get('year');
  range = this.navParams.get('range');
  pastPaper = this.navParams.get('pastPaper');

  constructor(public navCtrl: NavController,
              public navParams: NavParams) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContentsPage');

    if (this.contents){
      this.title.val = '목차별 문제풀기';
    } else if (this.year){
      this.title.val = '연도별 문제풀기';
    } else if (this.range){
      this.title.val = '범위별 문제풀기';
    } else if (this.pastPaper){
      this.title.val = '공부하기';
    }

    this.navbar.backButtonClick = (e:UIEvent) => {

      let navOptions = {
        animation: 'ios-transition'
      };
      this.navCtrl.pop({});
    }

  }

  budongsan(){
    if (this.contents){
      this.moveTo('ContentsPaperPage', { subTitle1: this.subject.title1 });
    } else if (this.year){
      this.moveTo('YearPaperPage', { subTitle1: this.subject.title1 });
    } else if (this.range){
      this.moveTo('RangePaperPage', {});
    } else if (this.pastPaper){
      this.moveTo('StudyPage', {});
    }
  }

  minbeop(){
    if (this.contents){
      this.moveTo('ContentsPaperPage', { subTitle2: this.subject.title2 });
    } else if (this.year){
      this.moveTo('YearPaperPage', { subTitle2: this.subject.title2 });
    } else if (this.range){
      this.moveTo('RangePaperPage', {});
    } else if (this.pastPaper){
      this.moveTo('StudyPage', {});
    }
  }

  moveTo(pageName, data){
    let navOptions = {
      animation: 'ios-transition'
    };
    this.navCtrl.push(pageName, data, navOptions);
  }

}
