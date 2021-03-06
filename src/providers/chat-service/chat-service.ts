import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { Events } from 'ionic-angular';
import { AngularFireDatabase, snapshotChanges } from 'angularfire2/database';

/*
  Generated class for the ChatServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ChatService {
  chatsRef= firebase.database().ref('chats/');
  messages=[];
  chatList=[];

  constructor(public events: Events, private db: AngularFireDatabase) {

  }

  addNewMsg(senderId:string, toUserId:string,message){
    if(toUserId){
      var promise = new Promise((resolve)=>{
        this.chatsRef.child(senderId).child(toUserId).push({
          sentBy: senderId,
          message: message,
          timeStamp: firebase.database.ServerValue.TIMESTAMP
        }).then(()=>{
          this.chatsRef.child(toUserId).child(senderId).push({
            sentBy: senderId,
            message: message,
            timeStamp: firebase.database.ServerValue.TIMESTAMP
          }).then(()=>{
            resolve(true);
          })
        })
      })
      return promise;
    }
  }

  getMessages(currentUserId:string,chatUserId:string){
    let temp;
    this.chatsRef.child(currentUserId).child(chatUserId).on('value',snapshot=>{
      this.messages=[];
      temp=snapshot.val();
      for(var tempKey in temp){
        this.messages.push(temp[tempKey]);
      }
      this.events.publish('newMessages');
    })
  }

  getChatList(currentUserId:string){

    this.db.list(`chats/${currentUserId}`).snapshotChanges().subscribe(data=>{
      data.map(item=>{
        this.chatList.push(item.key);
        this.events.publish('chatlist');
      })
    })
    return this.chatList;
  }

  emptyChatList(){
    this.chatList=[];
  }

}
