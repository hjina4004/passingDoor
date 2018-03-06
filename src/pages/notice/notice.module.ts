import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NoticePage } from './notice';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    NoticePage,
  ],
  imports: [
    IonicPageModule.forChild(NoticePage),
    TranslateModule.forChild()
  ],
})
export class NoticePageModule {}
