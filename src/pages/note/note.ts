import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Navbar } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-note',
  templateUrl: 'note.html',
})

export class NotePage {
  @ViewChild(Navbar) navbar: Navbar;

  private contentsNote = "";

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.navbar.backButtonClick = (e:UIEvent) => {
      let navOptions = {
        animation: 'ios-transition'
      };
      this.navCtrl.pop(navOptions);
    };

    this.contentsNote = this.navParams.get('contentsNote');
  }
}
