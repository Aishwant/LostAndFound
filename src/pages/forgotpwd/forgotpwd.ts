import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, AlertController } from 'ionic-angular';
import { ServicesAuth } from '../../providers/services-auth/services-auth';
import { User } from '../../models/user_interface';

/**
 * Generated class for the ForgotpwdPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forgotpwd',
  templateUrl: 'forgotpwd.html',
})
export class ForgotpwdPage {

  user= {} as User;
  email:string;
  constructor(public navCtrl: NavController, public navParams: NavParams, private sAuth: ServicesAuth, public menu: MenuController,public alertCtrl: AlertController) {
    this.menu.swipeEnable(false);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotpwdPage');
  }

  resetpwd(user: User){
    if(/^[a-zA-Z0-9_@.]+$/.test(user.email)&& user.email){
      this.sAuth.resetPasswordEmail(user)
      .then(
        () => {
          const alert = this.alertCtrl.create({
            title: 'Password Reset',
            subTitle: "A link to reset your password has been sent to the Email",
            buttons: ['OK']
          });
          alert.present();
        },
        error =>{
          const alert = this.alertCtrl.create({
            title: 'Invalid',
            subTitle: "Email was not found",
            buttons: ['OK']
          });
          alert.present();
        }
      );
    }else{
      const alert = this.alertCtrl.create({
        title: "Invalid",
        subTitle: "Please fill the field correctly",
        buttons: ['OK']
      });
      alert.present();
    }
  }
}
