import { Component } from '@angular/core';
import { IonicPage, NavController, Platform, MenuController, ModalController, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';

import { GlobalFunction } from '../../providers/global-function';

/**
 * The Welcome Page is a splash page that quickly describes the app,
 * and then directs the user to create an account or log in.
 * If you'd like to immediately put the user onto a login/signup page,
 * we recommend not using the Welcome page.
*/
@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})
export class WelcomePage {
  title = null;
  confirm_dlg = null;
  isSignedIn = false;
  funAuthSubscribe = null;

  isViewEvent =  {
    view: 'false'
  };

  page = {
    val1: 'contents',
    val2: 'year',
    val3: 'range',
    val4: 'pastPaper'
  };

  constructor(
    public navCtrl: NavController,
    private platform: Platform,
    private translate: TranslateService,
    private menuCtrl: MenuController,
    private modalCtrl: ModalController,
    private storage: Storage,
    private afAuth: AngularFireAuth,
    private globalFunction: GlobalFunction,
    private alertCtrl: AlertController) {

    this.platform.ready().then(() => {
      this.platform.registerBackButtonAction(() => {
        if (this.menuCtrl.isOpen()){
          this.menuCtrl.close();
        } else if (this.navCtrl.canGoBack()){
          this.globalFunction.moveBack();
        } else {
          this.confirmExitApp();
        }
      });
    });

    this.translate.get([
      "APP_NAME",
      "NOTICE_EXIT_APP",
      "OK_BUTTON",
      "CANCEL_BUTTON",
      "NOTICE_READY"
    ]).subscribe((values) => {this.title = values});
  } //constructor END

  ionViewDidEnter() {
    console.log("WelcomePage - ionViewDidEnter");
    this.funAuthSubscribe = this.afAuth.authState.subscribe(data => {
      if (data && data.email && data.uid) {
        this.globalFunction.presentToast(data.email + '님, 환영합니다.', 3000);
        this.isSignedIn = true;
      } else {
        this.globalFunction.presentToast('로그인 정보를 찾을 수 없습니다.', 3000);
        this.isSignedIn = false;
      }
    });
    // this.viewServiceEvent();
  }

  ionViewDidLeave() {
    console.log("WelcomePage - ionViewDidLeave");

    if (this.funAuthSubscribe)
      this.funAuthSubscribe.unsubscribe();
  }

  confirmExitApp() {
    if (this.confirm_dlg != null) return;

    this.confirm_dlg = this.alertCtrl.create({
      title: this.title.APP_NAME,
      cssClass:'PD_alert',
      message: this.title.NOTICE_EXIT_APP,
      buttons: [
        {
          text: this.title.CANCEL_BUTTON,
          handler: () => {
            this.confirm_dlg = null;
          }
        },
        {
          text: this.title.OK_BUTTON,
          handler: () => {
            this.platform.exitApp();
          }
        }
      ]
    });
    this.confirm_dlg.present();
  }

  viewServiceEvent() {
    let todayDate = new Date().toISOString().slice(0,10);
    let modal = this.modalCtrl.create('ModalPage');

    this.storage.get('checked_date').then( checkedDateData =>{
      if (checkedDateData == todayDate){
        // 다시보지않기 체크한 날짜와 오늘 날짜가 같다면 viewEvent 실행하지 않음
      } else if(checkedDateData != todayDate && this.isViewEvent.view == 'false'){
        modal.present();
        this.isViewEvent.view = 'true';
      }
    });
  }

  // content button
  keyword(){
    this.globalFunction.moveTo('KeywordPage', {});
  }

  contents1(){
    this.globalFunction.moveTo('ContentsPage', { contents: this.page.val1 });
  }

  contents2(){
    this.globalFunction.moveTo('ContentsPage', { year: this.page.val2 });
  }

  contents3(){
    this.globalFunction.moveTo('ContentsPage', { range: this.page.val3 });
  }

  contents4(){
    this.globalFunction.moveTo('ContentsPage', { pastPaper: this.page.val4 });
  }

  everyday() {
    this.globalFunction.presentToast(this.title.NOTICE_READY, 3000);
  }

  // footer button
  notice(){
    this.globalFunction.moveTo('NoticePage', {});
  }

  login(){
    if (this.isSignedIn) {
      this.afAuth.auth.signOut();
    } else {
      this.globalFunction.moveTo('LoginPage', {});
    }
  }

  howtouse(){
    this.globalFunction.moveTo('HowtousePage', {});
  }
}
