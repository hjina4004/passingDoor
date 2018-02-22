import { LanguageProvider } from './../../providers/language/language';
import { Component } from '@angular/core';
import { IonicPage, NavController, Platform, MenuController, ModalController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AndroidFullScreen } from '@ionic-native/android-full-screen';

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
  title = "";
  confirm_dlg = null;

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
    private menuCtrl: MenuController,
    private modalCtrl: ModalController,
    private lang: LanguageProvider,
    private storage: Storage,
    private androidFullScreen: AndroidFullScreen,
    private globalFunction: GlobalFunction,
    private alertCtrl: AlertController) {

    this.globalFunction.setNavController(this.navCtrl);
    this.platform.ready().then(() => {
      this.platform.registerBackButtonAction(() => {
        if (this.menuCtrl.isOpen()){
          this.menuCtrl.close();
        } else if (this.navCtrl.canGoBack()){
          this.globalFunction.moveBack();
        } else {
          this.showConfirm();
        }
      });

      this.androidFullScreen.isImmersiveModeSupported()
      .then(() => this.androidFullScreen.immersiveMode())
      .catch((error: any) => console.log(error));
    });
  } //constructor END

  showConfirm() {
    if (this.confirm_dlg != null) return;

    this.confirm_dlg = this.alertCtrl.create({
      title: '합격문',
      message: '프로그램을 종료합니다.',
      buttons: [
        {
          text: '취소',
          handler: () => {
            this.confirm_dlg = null;
          }
        },
        {
          text: '확인',
          handler: () => {
            this.platform.exitApp();
          }
        }
      ]
    });
    this.confirm_dlg.present();
  }

  ionViewDidEnter(){
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
    this.globalFunction.presentToast("준비 중입니다.", 3000);
  }

  // footer button
  notice(){
    this.globalFunction.moveTo('NoticePage', {});
  }

  login(){
    this.globalFunction.moveTo('LoginPage', {});
  }

  howtouse(){
    this.globalFunction.moveTo('HowtousePage', {});
  }
}
