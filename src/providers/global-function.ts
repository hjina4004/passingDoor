import { Injectable } from '@angular/core';
import { ToastController, App } from 'ionic-angular';


@Injectable()
export class GlobalFunction {
  constructor (
    private toastCtrl: ToastController,
    public appCtrl: App
  ) {}

  // don't call any of these until this.ready resolves
  moveTo (pageName, data) {
    this.appCtrl.getRootNav().push(pageName, data, {animation: 'ios-transition'});
  }

  moveBack () {
    this.appCtrl.getRootNav().pop({animation: 'ios-transition', direction: 'back'});
  }

  presentToast (msg, time) {
    let toast = this.toastCtrl.create({message: msg, duration: time});
    toast.present();
  }
}
