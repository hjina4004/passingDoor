import { LanguageProvider } from './../../providers/language/language';
import { Component } from '@angular/core';
import { IonicPage, NavController, Platform, MenuController, ModalController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

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

  isViewEvent =  {
    view: 'false'
  };

  page = {
    val1: 'contents',
    val2: 'year',
    val3: 'range',
    val4: 'pastPaper'
  };
  // pageName1 = 'contents';
  // pageName2 = 'year';

  constructor(
    public navCtrl: NavController,
    private platform: Platform,
    private menuCtrl: MenuController,
    private modalCtrl: ModalController,
    private lang: LanguageProvider,
    private storage: Storage,
    private aletCtrl: AlertController) {

    this.platform.ready().then(() => {
      this.platform.registerBackButtonAction(() => {
        if (this.menuCtrl.isOpen()){
          this.menuCtrl.close();
        } else if (this.navCtrl.canGoBack()){
          let navOptions = {
            animation: 'ios-transition'
          };
          this.navCtrl.pop(navOptions);
        } else {
          // let alert = this.aletCtrl.create({
          //   title: '알림',
          //   message: '합격문 앱을 종료하시겠습니까?',
          //   buttons: [{
          //     text: '취소',
          //     role: 'cancel'
          //   }, {
          //     text: '확인',
          //     handler: () => { this.platform.exitApp(); }
          //   }]
          // })
          // alert.present();
          alert('종료');
          this.platform.exitApp();
        }
      });
    });
  } //constructor END

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
    this.moveTo('KeywordPage', {});
  }

  contents1(){
    this.moveTo('ContentsPage', { contents: this.page.val1 });
  }
  contents2(){
    this.moveTo('ContentsPage', { year: this.page.val2 });
  }
  contents3(){
    this.moveTo('ContentsPage', { range: this.page.val3 });
  }
  contents4(){
    this.moveTo('ContentsPage', { pastPaper: this.page.val4 });
  }

  // footer button
  notice(){
    this.moveTo('NoticePage', {});
  }

  howtouse(){
    this.moveTo('HowtousePage', {});
  }

  login(){
    this.moveTo('LoginPage', {});
  }

  moveTo(pageName, data){
    let navOptions = {
      animation: 'ios-transition'
    };
    this.navCtrl.push(pageName, data, {});
  }

}
