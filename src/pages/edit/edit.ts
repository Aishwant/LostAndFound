import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ServicesAuth } from '../../providers/services-auth/services-auth';

/**
 * Generated class for the EditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit',
  templateUrl: 'edit.html',
})
export class EditPage {

  changePassword;
  updateProfile;

  newPwd:string;
  fname:string;
  lname:string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private sAuth: ServicesAuth, private alertCtrl: AlertController) {
    this.changePassword = this.navParams.get('changePassword');
    this.updateProfile = this.navParams.get('updateProfile');
  }

  updatePwd(){
    this.sAuth.changePassword(this.newPwd)
    .then(
      () => {
        const alert = this.alertCtrl.create({
          subTitle: "Password updated",
          buttons: ['OK']
        })
        alert.present();
      },
      error =>{
        const alert = this.alertCtrl.create({
          subTitle: error,
          buttons: ['OK']
        })
        alert.present();
      }
    )

  }

  updateProf(){
    const alert = this.alertCtrl.create({
      subTitle: "Feature Coming Soon",
      buttons: ['OK']
    })
    alert.present();
  }
}
