import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SolvePage } from './solve';

@NgModule({
  declarations: [
    SolvePage,
  ],
  imports: [
    IonicPageModule.forChild(SolvePage),
  ],
})
export class SolvePageModule {}
