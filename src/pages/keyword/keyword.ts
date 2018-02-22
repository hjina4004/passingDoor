import { AutocompleteDataProvider } from './../../providers/autocomplete-data/autocomplete-data';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { MinbeopProvider } from '../../providers/minbeop/minbeop';

import { ToastController } from 'ionic-angular';

/**
 * Generated class for the KeywordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-keyword',
  templateUrl: 'keyword.html',
})
export class KeywordPage {

  test: string = "<br><h3>기출풀기<br><br>1. (민법) 부동산물권변동<br>2. (민법)유치권</h3>";

  myInput = {keyword:""};

  searchResult;

  // loginInfo = {
  //   user_id: '',
  //   token_id: ''
  // };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    private minbeopPv: MinbeopProvider,
    private toastCtrl: ToastController,
    private autoPv: AutocompleteDataProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad KeywordPage');


    // var dataPromise = this.storage.get('member_id');

    // dataPromise.then(data => {
    //   if(data){
    //     this.storage.get('tokenid').then( dataToken =>{
    //       this.loginInfo.user_id = data + '님 환영합니다.';
    //       this.loginInfo.token_id = dataToken;
    //     });
    //   } else {
    //     this.loginInfo.user_id = '게스트입니다.';
    //   }
    // });
  } //ionViewDidLoad END

  onInput(ev){
    let searchKeyword = ev.target.value;
    if (searchKeyword){
      this.autoPv.autocomplete(searchKeyword).then(data => {
        this.searchResult = data;
      });
    } //if END
  }

  searchKeyword(){
    let keyword = this.myInput.keyword.trim();

    if (keyword === undefined || keyword == ''){
      alert('keyword를 입력해주세요');
    } else {
      this.minbeopPv.searchMinbeop(keyword).then(keywordData => {
        let navOptions = {
          animation: 'ios-transition'
        };
        this.navCtrl.push('KeywordResultPage', { getSearchData: keywordData, sKeyword: keyword }, navOptions);
      });
    }
  } // searchKeyword END

  goSearch(item) {
    this.myInput.keyword = item.searchWord;
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
