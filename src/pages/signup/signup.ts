import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
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
  username: string;
  password: string;
  email:string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
  }

  redirectTo_login(){
    this.navCtrl.push(LoginPage);
  }

  redirectTo_feed(){
    if(!this.fname || !this.lname || !this.email || !this.username || !this.password){
      const alert = this.alertCtrl.create({
        subTitle: "Please fill all the fields",
        buttons: ['OK']
      });
      alert.present();
    }else{
      this.navCtrl.setRoot(FeedPage);
    }
  }

}
