import { Component, ViewChild } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Nav, Platform } from 'ionic-angular';

import { FirstRunPage } from '../pages/pages';
import { Settings } from '../providers/providers';
import { Storage } from '@ionic/storage';

@Component({
  template: `<ion-menu [content]="content">
    <ion-header>
      <ion-toolbar>
        <ion-title>Pages</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-list>
        <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">
          {{p.title}}
        </button>
      </ion-list>
    </ion-content>

  </ion-menu>
  <ion-nav #content [root]="rootPage"></ion-nav>`
})
export class MyApp {

  rootPage;

  @ViewChild(Nav) nav: Nav;

  pages: Array<{title: string, component: any, type: string}>;

  constructor(private platform: Platform, 
              settings: Settings,
              private statusBar: StatusBar, 
              private splashScreen: SplashScreen,
              private storage: Storage) {

    this.platform.ready().then(() => {
    // Okay, so the platform is ready and our plugins are available.
    // Here you can do any higher level native things you might need.
    this.statusBar.styleDefault();
    this.splashScreen.hide();
    });

    // rootPage 설정
    let todayDate = new Date().toISOString().slice(0,10);

    this.storage.get('checked_date').then( checkedDateData =>{
      if (checkedDateData && checkedDateData == todayDate){
        this.rootPage = 'WelcomePage';
      } else {
        this.rootPage = FirstRunPage;
      }
    });

    // if (this.nav.canGoBack()){
    //   let navOptions = {
    //     animation: 'ios-transition'
    //   };
    //   this.nav.pop(navOptions);
    // }

    this.pages = [
      { title: 'Home', component: 'WelcomePage', type: 'setRoot' },
      { title: '공지사항', component: 'NoticePage', type: 'push' },
      { title: '설정', component: 'SettingsPage', type: 'push' }
    ];
  }

  // ionViewWillLeave(){
  //   let navOptions = {
  //     animation: 'ios-transition'
  //   };
  //   this.nav.pop(navOptions);
  // }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    //this.nav.setRoot(page.component);

    if (page.type == 'setRoot'){
      this.nav.setRoot(page.component);
    } else {
      let navOptions = {
        animation: 'ios-transition'
      };
      this.nav.push(page.component, null, navOptions);
    }
  }

}
