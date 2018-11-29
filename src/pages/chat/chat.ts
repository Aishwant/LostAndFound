import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Events } from 'ionic-angular';
import { UserService } from '../../providers/user-service/user-service';
import { ChatService } from '../../providers/chat-service/chat-service';

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  @ViewChild('content') content:any;

  chatUserId:any;
  currentUserId:any;
  fnameFrom:string;
  fnameTo:string;
  oldMessages=[];
  message = '';
  userCurrent=[];
  userChat=[];
  check=false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, private userServ: UserService,private chatServ: ChatService,public events: Events) {
    this.user = navParams.get('userN');
    this.chatUserId = navParams.get('userId');
    this.currentUserId = this.userServ.userId;

    this.events.subscribe('newMessages',()=>{
      this.oldMessages = [],
      this.oldMessages = this.chatServ.messages;
    })

    this.userServ.getUsers(this.chatUserId).on('value',ab=>{
      this.userChat=ab.val();
    });
  }
  ionViewDidEnter(){
    setTimeout(() => {
      this.content.scrollToBottom(0);
    });
  }
  ionViewDidLoad(){
    this.chatServ.getMessages(this.currentUserId,this.chatUserId);
    this.check=true;
  }
  send(){
    this.addMessage();
  }

  addMessage(){
      this.chatServ.addNewMsg(this.currentUserId,this.chatUserId,this.message).then(()=>{
        this.message='';
      });
  }
}
