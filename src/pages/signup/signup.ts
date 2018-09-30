import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { FeedPage } from '../feed/feed';
import { AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  fname: string;
  lname: string;
  email: string;
  password: string;
  re_password:string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
  }

  redirectTo_feed(){

    //validity check
    if(/^[a-zA-Z0-9_@.]+$/.test(this.email) && this.fname && this.lname && this.password && this.re_password){

      if(this.password === this.re_password){

        this.navCtrl.setRoot(FeedPage);

      }else{

        const alert = this.alertCtrl.create({
          subTitle: "Passwords don't match",
          buttons: ['OK']
        });
        alert.present();
      }

    }else{

      const alert = this.alertCtrl.create({
        title: "Invalid",
        subTitle: "Please fill all the fields correctly",
        buttons: ['OK']
      });
      alert.present();
    }

  }

}
