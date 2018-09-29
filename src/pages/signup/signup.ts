import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { FeedPage } from '../feed/feed';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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
    this.navCtrl.push(HomePage).then(()=> {
      this.navCtrl.pop;
    });
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
