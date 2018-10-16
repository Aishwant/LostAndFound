import { Component } from '@angular/core';
import { IonicPage, NavController, MenuController } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { FeedPage } from '../feed/feed';
import { AlertController } from 'ionic-angular';
import { User } from '../../models/user';
import { ServicesAuth } from '../../providers/services-auth/services-auth';
import { ForgotpwdPage } from '../forgotpwd/forgotpwd';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user = {} as User;
  email: string;
  password: string;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public menu: MenuController, private sAuth: ServicesAuth) {
    this.menu.swipeEnable(false);
  }

  login(){
    if(/^[a-zA-Z0-9_@.]+$/.test(this.email) && this.password){ //validity check
      this.sAuth.loginVerificationEmail(this.email,this.password)
      .then(
        () => this.navCtrl.setRoot(FeedPage),
        error =>{
          const alert = this.alertCtrl.create({
          title: "Invalid",
          subTitle: "The Email or Password is incorrect",
          buttons: ['OK']
        });
        alert.present();
        }
        );
    }else{
      const alert = this.alertCtrl.create({
        title: "Invalid",
        subTitle: "Please fill all the fields correctly",
        buttons: ['OK']
      });
      alert.present();
    }

  }
  redirectTo_SignUp(){
    this.navCtrl.push(SignupPage);
  }

  redirectTo_forgotpwd(){
    this.navCtrl.push(ForgotpwdPage);
  }
}
