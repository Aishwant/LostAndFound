import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';

import { FeedPage } from '../feed/feed';
import { AlertController } from 'ionic-angular';
import { ServicesAuth } from '../../providers/services-auth/services-auth'
import { User } from '../../models/user';
@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  user = {} as User;
  fname: string;
  lname: string;
  email: string;
  password: string;
  re_password:string;

  constructor(public navParams: NavParams, public alertCtrl: AlertController, public menu: MenuController, private sAuth:ServicesAuth, private navCtrl: NavController) {
    this.menu.swipeEnable(false);
  }

  register(){

    //validity check
    if(/^[a-zA-Z0-9_@.]+$/.test(this.email) && this.fname && this.lname && this.password && this.re_password){

      if(this.password === this.re_password){

        this.sAuth.signupWithEmail(this.email,this.password)
          .then(
            () => this.navCtrl.setRoot(FeedPage),
            error => {
              const alert = this.alertCtrl.create({
                subTitle: error.message,
                buttons: ['OK']
              });
              alert.present();
            }
          );

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
