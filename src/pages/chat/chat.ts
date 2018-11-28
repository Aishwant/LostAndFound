import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Observable } from 'rxjs';
import { Socket } from 'ng-socket-io';

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
  fnameFrom:string;
  fnameTo:string;
  messagesOld=[];
  message = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, private socket: Socket) {
    this.user = navParams.get('userN');
    this.getMessages().subscribe(message => {
      this.messagesOld.push(message);
    });

    this.getUsers().subscribe(data =>{
      let user1 = data['user'];
    })

    // this.getUsers().subscribe(data => {
    //   let user = data['user'];
    //   if(data['event'] === 'left') {

    //   }else{

    //   }
    // })
  }

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad ChatPage');
  // }

  ionViewWillLeave(){
    this.socket.disconnect();
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
    this.socket.emit('add-message',{text:this.message});
    this.message = '';
    // const alert = this.alertCtrl.create({
    //   subTitle: "Feature coming out soon",
    //   buttons:['OK']
    // });
    // alert.present();
  }

  // getUsers(){
  //   let observable = new Observable(ob =>{
  //     this.socket.on('users-changed',data=>{
  //       ob.next(data);
  //     })
  //   });
  //   return observable;
  // }
  getMessages(){
    let observable = new Observable(ob => {
      this.socket.on('message',data=>{
        ob.next(data);
      })
    });
    return observable;
  }

  getUsers(){
    let observable = new Observable(ob => {
      this.socket.on('users-changed',data=>{
        ob.next(data);
      })
    });
    return observable;
  }
}
