import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Navbar } from 'ionic-angular';
import { Http, Response } from '@angular/http';


@IonicPage()
@Component({
  selector: 'page-note',
  templateUrl: 'note.html',
})

export class NotePage {
  @ViewChild(Navbar) navbar: Navbar;

  private contentsNote: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http) {
    this.loadNote();
  }

  ionViewDidLoad() {
    this.navbar.backButtonClick = (e:UIEvent) => {
      let navOptions = {
        animation: 'ios-transition'
      };
      this.navCtrl.pop(navOptions);
    }
  }

  loadNote() {
    this.http.get('assets/html/minbeop.html')
    .map((res:Response) => res.text())
    .subscribe(data => {
      this.contentsNote = data;
    }, error =>{
      alert("error:" + JSON.stringify(error));
    });
  }
}
