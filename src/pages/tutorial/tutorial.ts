import { Component } from '@angular/core';
import { IonicPage, MenuController, NavController, Platform } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { MainPage } from '../../pages/pages';

export interface Slide {
  image: string;
}

@IonicPage()
@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html'
})
export class TutorialPage {
  slides: Slide[];
  showSkip = true;
  dir: string = 'ltr';
  checked : boolean = false;

  constructor(public navCtrl: NavController, 
              public menu: MenuController, 
              translate: TranslateService, 
              public platform: Platform,
              private storage: Storage) {

    this.dir = platform.dir();
    translate.get(["TUTORIAL_SLIDE1_TITLE",
      "TUTORIAL_SLIDE1_DESCRIPTION",
      "TUTORIAL_SLIDE2_TITLE",
      "TUTORIAL_SLIDE2_DESCRIPTION",
      "TUTORIAL_SLIDE3_TITLE",
      "TUTORIAL_SLIDE3_DESCRIPTION",
    ]).subscribe(
      (values) => {
        console.log('Loaded values', values);
        this.slides = [
          {
            image: 'assets/img/tu-slidebox-img-1.jpg',
          },
          {
            image: 'assets/img/tu-slidebox-img-2.jpg',
          },
          {
            image: 'assets/img/tu-slidebox-img-3.jpg',
          }
        ];
      });
  }

  startApp() {
    let checkDate = new Date().toISOString().slice(0,10);
    let navOptions = {
      animation: 'ios-transition'
    };
    
    if (this.checked == true){
      this.storage.set('checked_date', checkDate);
      this.navCtrl.setRoot(MainPage, {}, navOptions);
    } else {
      this.navCtrl.setRoot(MainPage, {}, navOptions);
    }
  } 

  onSlideChangeStart(slider) {
    this.showSkip = !slider.isEnd();
  }

  ionViewDidEnter() {
    // the root left menu should be disabled on the tutorial page
    this.menu.enable(false);
  }

  ionViewWillLeave() {
    // enable the root left menu when leaving the tutorial page
    this.menu.enable(true);
  }

}
