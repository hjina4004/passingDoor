import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HowtousePage } from './howtouse';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    HowtousePage,
  ],
  imports: [
    IonicPageModule.forChild(HowtousePage),
    TranslateModule.forChild()
  ],
})
export class HowtousePageModule {}
