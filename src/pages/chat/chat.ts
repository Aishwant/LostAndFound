import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  user:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController) {
    this.user = navParams.get('userN');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
  }

  checkNewMsg(){
    return true;
  }

  NewMsgServer(){
    return 'Hello. Thank you for helping me find my lost item :) Have a good day';
  }

  NewMsgClient(){
    return "You're welcome. Hope you want lose it again :P have a good day";
  }

  send(){
    const alert = this.alertCtrl.create({
      subTitle: "Feature coming out soon",
      buttons:['OK']
    });
    alert.present();
  }
}
