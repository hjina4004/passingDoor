import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MinbeopProvider } from '../../providers/minbeop/minbeop';

import { ToastController } from 'ionic-angular';

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

  title = {
    val: ''
  };

  minbeop = [];

  searchData = this.navParams.get('getSearchData');
  sKeyword = this.navParams.get('sKeyword');

  constructor(
    public navCtrl: NavController,
    private toastCtrl: ToastController,
    public navParams: NavParams,
    private minbeopPv: MinbeopProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad KeywordResultPage');

    // title keyword
    this.title.val = this.sKeyword;
    // this.title.val = '법';

    //input search data
    this.minbeop = this.searchData;
  }

  solve(selected_id){
    // alert(JSON.stringify(selected_id.m_key));
    // let todayDate = new Date().toISOString().slice(0,10);
    let m_key = JSON.stringify(selected_id.m_key).slice(0,-1);

    this.minbeopPv.getExam(m_key).then(m_keyData => {
      let navOptions = {
        animation: 'ios-transition'
      };
      this.navCtrl.push('SolvePage', { getExamData: m_keyData}, navOptions);
    });
  }

  goNote() {
    this.presentToast("불러 오는 중입니다.");
    this.navCtrl.push('NotePage');
  }

  goVideo() {
    this.presentToast("준비 중입니다.");
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }
}
