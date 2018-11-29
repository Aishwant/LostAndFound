import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { ChatPage } from '../chat/chat';
import { ChatService } from '../../providers/chat-service/chat-service';
import { UserService } from '../../providers/user-service/user-service';
import { AngularFireDatabase } from 'angularfire2/database';

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
  userId:any;
  chatList;any;
  chatUserList:any;
  check=false;

  constructor(public navCtrl: NavController, public navParams: NavParams,private chatServ: ChatService, private userServ: UserService, private db: AngularFireDatabase) {
    this.userId=this.userServ.userId;
  }
  ionViewDidLoad(){
    this.chatList=this.chatServ.getChatList(this.userId);
    this.check = true;
  }
  getlistChat(){
    return this.listUserChat;
  }

  getUserC(userId){
    let content;
    this.userServ.getUsers(userId).on('value',ab=>{
      content=ab.val();
    })
    return content;
  }

}