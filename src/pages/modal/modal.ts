import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the ModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class ModalPage {

  img : string = '<center><img src="assets/img/hi.PNG"></center>';
  checked : boolean = false;


  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private viewCtrl: ViewController,
              private storage: Storage) {
  }

  closeModal(){
    //close button을 누를 때 key, value, 값 check
    let checkDate = new Date().toISOString().slice(0,10);
    if (this.checked == true){
      this.storage.set('checked_date', checkDate);
      this.viewCtrl.dismiss();
    } else {
      this.viewCtrl.dismiss();
    }
    
  } // closeModal END

}
