import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';

import { AlertController } from 'ionic-angular';
import { ServicesAuth } from '../../providers/services-auth/services-auth';
import { UserService } from '../../providers/user-service/user-service';

import { User } from '../../models/user_interface';
import { FirstIntroPage } from '../first-intro/first-intro';
@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  user = {} as User;
  re_password: string;

  constructor(public navParams: NavParams, public alertCtrl: AlertController, public menu: MenuController, private sAuth:ServicesAuth, private navCtrl: NavController,private uDB: UserService) {
    this.menu.swipeEnable(false);
  }

  register(user: User){
    // validity check
    if(/^[a-zA-Z0-9_@.]+$/.test(user.email) && user.password && this.re_password){

      if(user.password === this.re_password){

        this.sAuth.signupWithEmail(user)
          .then(
            () =>{
              this.navCtrl.setRoot(FirstIntroPage);
            },
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
