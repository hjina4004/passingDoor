import { Injectable } from '@angular/core';
import { ToastController, NavController } from 'ionic-angular';


@Injectable()
export class GlobalFunction {
  private navCtrl: NavController;

  constructor (private toastCtrl: ToastController) {
  }

  setNavController (navCtrl) {
    this.navCtrl = navCtrl;
  }

  // don't call any of these until this.ready resolves
  moveTo (pageName, data) {
    this.navCtrl.push(pageName, data, {animation: 'ios-transition'});
  }

  moveBack () {
    this.navCtrl.pop({animation: 'ios-transition', direction: 'back'});
  }

  presentToast (msg, time) {
    let toast = this.toastCtrl.create({message: msg, duration: time});
    toast.present();
  }
}
