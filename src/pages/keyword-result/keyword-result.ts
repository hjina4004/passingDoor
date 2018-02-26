import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import { MinbeopProvider } from '../../providers/minbeop/minbeop';
import { TranslateService } from '@ngx-translate/core';

import { GlobalFunction } from '../../providers/global-function';

/**
 * Generated class for the KeywordResultPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-keyword-result',
  templateUrl: 'keyword-result.html',
})
export class KeywordResultPage {

  title = null;
  minbeop = null;

  searchData = this.navParams.get('getSearchData');
  sKeyword = this.navParams.get('sKeyword');

  constructor(
    public navParams: NavParams,
    private translate: TranslateService,
    private globalFunction: GlobalFunction,
    private minbeopPv: MinbeopProvider
  ) {
    this.translate.get([
      "SEARCH_PLACEHOLDER",
      "NOTICE_READY"
    ]).subscribe((values) => {this.title = values});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad KeywordResultPage');

    //input search data
    this.minbeop = this.searchData;
  }

  swipeEvent(ev) {
    console.log("swipeEvent:", ev.direction);
    if (ev.direction == 4) {
      this.globalFunction.moveBack();
    }
  }

  solve(selected_id) {
    // alert(JSON.stringify(selected_id.m_key));
    // let todayDate = new Date().toISOString().slice(0,10);
    let m_key = JSON.stringify(selected_id.m_key).slice(0,-1);

    this.minbeopPv.getExam(m_key).then(m_keyData => {
      this.globalFunction.moveTo('SolvePage', {getExamData: m_keyData});
    });
  }

  goNote() {
    this.globalFunction.moveTo('NotePage', {});
  }

  goVideo() {
    this.globalFunction.presentToast(this.title.NOTICE_READY, 3000);
  }
}
