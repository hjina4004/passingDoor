import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavParams, Navbar } from 'ionic-angular';

import { GlobalFunction } from '../../providers/global-function';

/**
 * Generated class for the SolvePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-solve',
  templateUrl: 'solve.html',
})
export class SolvePage {

  @ViewChild(Navbar) navbar: Navbar;

  year = '';
  times = '';
  req = '';

  examTitle = '';
  public exam = [];

  getExamData = this.navParams.get('getExamData');

  constructor(
    private globalFunction: GlobalFunction,
    public navParams: NavParams
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad SolvePage');

    this.navbar.backButtonClick = (e:UIEvent) => {
      this.globalFunction.moveBack();
    }

    this.year = JSON.stringify(this.getExamData[0].year);
    this.times = JSON.stringify(this.getExamData[0].times);
    this.req = JSON.stringify(this.getExamData[0].req);

    this.examTitle = JSON.stringify(this.getExamData[0].content).replace(/"/g, "");

    for (let index=1; index < this.getExamData.length; index++){
      let pushData = {content:"", checked:false};
      pushData.content = JSON.stringify(this.getExamData[index].content).replace(/"/g, "");

      this.exam.push(pushData);
    }

  } //ionViewDidLoad END

  swipeEvent(ev) {
    console.log("swipeEvent:", ev.direction);
    if (ev.direction == 4) {
      this.globalFunction.moveBack();
    }
  }
}
