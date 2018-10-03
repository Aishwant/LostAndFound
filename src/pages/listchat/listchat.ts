import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ChatPage } from '../chat/chat';

@IonicPage()
@Component({
  selector: 'page-listchat',
  templateUrl: 'listchat.html',
})
export class ListchatPage {

  listUserChat: any = [
      {
        name: 'Aish',
        avatar: "assets/imgs/me.jpg",
        content: "Hello. You're welcome. Hope you won't lose it again :P"
      },
      {
        name: 'Aero',
        avatar: "assets/imgs/aero.jpg",
        content: "Hello. You're awesome. Thank you for finding my belongings :)"
      }
  ];


  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  gotoUserC(name:string){
    this.navCtrl.push(ChatPage, {userN: name});
  }

  getlistChat(){
    return this.listUserChat;
  }

}