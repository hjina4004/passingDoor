import { AutocompleteDataProvider } from './../../providers/autocomplete-data/autocomplete-data';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { MinbeopProvider } from '../../providers/minbeop/minbeop';

import { GlobalFunction } from '../../providers/global-function';


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
    private globalFunction: GlobalFunction,
    private autoPv: AutocompleteDataProvider) {
    this.globalFunction.setNavController(this.navCtrl);
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

  swipeEvent(ev) {
    console.log("swipeEvent:", ev.direction);
    if (ev.direction == 4) {
      this.globalFunction.moveBack();
    }
  }

  onInput(ev){
    let searchKeyword = ev.target.value;
    if (searchKeyword){
      this.autoPv.autocomplete(searchKeyword).then(data => {
        this.searchResult = data;
      });
    } //if END
  }

  searchKeyword() {
    let keyword = this.myInput.keyword.trim();

    if (keyword === undefined || keyword == ''){
      this.globalFunction.presentToast('keyword를 입력해주세요', 3000);
    } else {
      this.minbeopPv.searchMinbeop(keyword).then(keywordData => {
        this.globalFunction.moveTo('KeywordResultPage', { getSearchData: keywordData, sKeyword: keyword });
      });
    }
  } // searchKeyword END

  goSearch(item) {
    this.myInput.keyword = item.searchWord;
  }

  goNote() {
    this.globalFunction.moveTo('NotePage', {});
  }

  goVideo() {
    this.globalFunction.presentToast("준비 중입니다.", 3000);
  }
}
