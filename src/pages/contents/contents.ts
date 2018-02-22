import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavParams, Navbar } from 'ionic-angular';

import { TranslateService } from '@ngx-translate/core';
import { GlobalFunction } from '../../providers/global-function';

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

  constructor(
    private globalFunction: GlobalFunction,
    private translate: TranslateService,
    public navParams: NavParams
  ) {}

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
      this.globalFunction.moveBack();
    }
  }

  budongsan(){
    if (this.contents){
      this.globalFunction.moveTo('ContentsPaperPage', { subTitle1: this.subject.title1 });
    } else if (this.year){
      this.globalFunction.moveTo('YearPaperPage', { subTitle1: this.subject.title1 });
    } else if (this.range){
      // this.globalFunction.moveTo('RangePaperPage', {});
      this.translate.get(["NOTICE_READY"]).subscribe((values) => {
        console.log('Loaded values', values);
        this.globalFunction.presentToast(values.NOTICE_READY, 3000);
      });
    } else if (this.pastPaper){
      this.globalFunction.moveTo('StudyPage', {});
    }
  }

  minbeop(){
    if (this.contents){
      this.globalFunction.moveTo('ContentsPaperPage', { subTitle2: this.subject.title2 });
    } else if (this.year){
      this.globalFunction.moveTo('YearPaperPage', { subTitle2: this.subject.title2 });
    } else if (this.range){
      // this.globalFunction.moveTo('RangePaperPage', {});
      this.translate.get(["NOTICE_READY"]).subscribe((values) => {
        console.log('Loaded values', values);
        this.globalFunction.presentToast(values.NOTICE_READY, 3000);
      });
    } else if (this.pastPaper){
      this.globalFunction.moveTo('StudyPage', {});
    }
  }

  joonggae() {
    this.translate.get(["NOTICE_READY"]).subscribe((values) => {
      console.log('Loaded values', values);
      this.globalFunction.presentToast(values.NOTICE_READY, 3000);
    });
  }

  gongbeop() {
    this.translate.get(["NOTICE_READY"]).subscribe((values) => {
      console.log('Loaded values', values);
      this.globalFunction.presentToast(values.NOTICE_READY, 3000);
    });
  }

  gongsi() {
    this.translate.get(["NOTICE_READY"]).subscribe((values) => {
      console.log('Loaded values', values);
      this.globalFunction.presentToast(values.NOTICE_READY, 3000);
    });
  }
}
