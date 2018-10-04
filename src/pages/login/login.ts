import { Component } from '@angular/core';
import { IonicPage, NavController, MenuController } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { FeedPage } from '../feed/feed';
import { AlertController } from 'ionic-angular';
import { User } from '../../models/user';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user = {} as User;
  email: string;
  password: string;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public menu: MenuController) {
    this.menu.swipeEnable(false);
  }
  login(){

  }

  redirectTo_SignUp(){
    this.navCtrl.push(SignupPage);
  }

  redirectTo_feed(){

    if(/^[a-zA-Z0-9_@.]+$/.test(this.email) && this.password){ //validity check
      this.navCtrl.setRoot(FeedPage);
    }else{
      const alert = this.alertCtrl.create({
        title: "Invalid",
        subTitle: "Please fill all the fields correctly",
        buttons: ['OK']
      });
      alert.present();
    }

  }

  redirectTo_forgotpwd(){
    console.log('Clicked');
    // this.navCtrl.push('');
  }
}
