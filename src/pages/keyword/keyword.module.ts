import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { KeywordPage } from './keyword';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    KeywordPage,
  ],
  imports: [
    IonicPageModule.forChild(KeywordPage),
    TranslateModule.forChild()
  ],
})
export class KeywordPageModule {}
