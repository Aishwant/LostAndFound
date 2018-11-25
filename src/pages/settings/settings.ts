import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EditPage } from '../edit/edit';

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  changePassword(){
    let changePassword=true;
    this.navCtrl.push(EditPage,{changePassword:changePassword})
  }

  updateProf(){
    let updateProf=true;
    this.navCtrl.push(EditPage,{updateProfile:updateProf})
  }

}
