import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FirstIntroPage } from './first-intro';

@NgModule({
  declarations: [
    FirstIntroPage,
  ],
  imports: [
    IonicPageModule.forChild(FirstIntroPage),
  ],
})
export class FirstIntroPageModule {}
