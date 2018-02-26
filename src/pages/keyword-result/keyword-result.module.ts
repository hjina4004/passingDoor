import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { KeywordResultPage } from './keyword-result';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    KeywordResultPage,
  ],
  imports: [
    IonicPageModule.forChild(KeywordResultPage),
    TranslateModule.forChild()
  ],
})
export class KeywordResultPageModule {}
