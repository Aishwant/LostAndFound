import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListchatPage } from './listchat';

@NgModule({
  declarations: [
    ListchatPage,
  ],
  imports: [
    IonicPageModule.forChild(ListchatPage),
  ],
})
export class ListchatPageModule {}
