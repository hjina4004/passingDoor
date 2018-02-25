import { AutocompleteDataProvider } from './../../providers/autocomplete-data/autocomplete-data';
import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
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

  searchResult = [
    // {searchWord: "(민법) 부동산 물권 변동"},
    // {searchWord: "(민법) 유치권"},
    // {searchWord: "(학개론) 부동산의 특성"},
    // {searchWord: "(학개론) 수요변화의 요인"},
    // {searchWord: "(중개사법) 정책 심의 위원회"},
    // {searchWord: "(중개사법) 개설 등록 기준"},
    // {searchWord: "(공법) 기반 시설 종류"},
    // {searchWord: "(공법) 지역 주택 조합"},
    // {searchWord: "(공사법) 지목의 종류"},
    // {searchWord: "(공사법) 지목의 종류 2"}
  ];

  constructor(
    private minbeopPv: MinbeopProvider,
    private globalFunction: GlobalFunction,
    private autoPv: AutocompleteDataProvider
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad KeywordPage');
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
      // this.globalFunction.moveTo('KeywordResultPage', { getSearchData: [], sKeyword: "test: keyword" });
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
