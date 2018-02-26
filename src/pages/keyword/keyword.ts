import { AutocompleteDataProvider } from './../../providers/autocomplete-data/autocomplete-data';
import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

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
  title = null;
  myInput = {keyword:""};

  testing = true;
  searchResult = null;

  constructor(
    private minbeopPv: MinbeopProvider,
    private translate: TranslateService,
    private globalFunction: GlobalFunction,
    private autoPv: AutocompleteDataProvider
  ) {
    this.translate.get([
      "SEARCH_PLACEHOLDER",
      "NOTICE_READY"
    ]).subscribe((values) => {this.title = values});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad KeywordPage');
    if (this.testing) {
      this.searchResult = [
        {searchWord: "(민법) 부동산 물권 변동"},
        {searchWord: "(민법) 유치권"},
        {searchWord: "(학개론) 부동산의 특성"},
        {searchWord: "(학개론) 수요변화의 요인"},
        {searchWord: "(중개사법) 정책 심의 위원회"},
        {searchWord: "(중개사법) 개설 등록 기준"},
        {searchWord: "(공법) 기반 시설 종류"},
        {searchWord: "(공법) 지역 주택 조합"},
        {searchWord: "(공사법) 지목의 종류"},
        {searchWord: "(공사법) 지목의 종류 2"}
      ];
    }
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
      if (this.testing) {
        let keywordData = [
          {year: "17", times: "28", req: "55", keyword: "개념"},
          {year: "16", times: "27", req: "52", keyword: "판례"},
          {year: "15", times: "26", req: "55", keyword: "판례"},
          {year: "13", times: "24", req: "51", keyword: "판례"},
          {year: "13", times: "24", req: "56", keyword: "단순암기"},
          {year: "11", times: "22", req: "52", keyword: ""},
          {year: "11", times: "22", req: "53", keyword: ""}
        ];
        this.globalFunction.moveTo('KeywordResultPage', {getSearchData: keywordData, sKeyword: "판례"});
      } else {
        this.globalFunction.presentToast(this.title.SEARCH_PLACEHOLDER, 3000);
      }
    } else {
      this.minbeopPv.searchMinbeop(keyword).then(keywordData => {
        this.globalFunction.moveTo('KeywordResultPage', {getSearchData: keywordData, sKeyword: keyword});
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
    this.globalFunction.presentToast(this.title.NOTICE_READY, 3000);
  }
}
