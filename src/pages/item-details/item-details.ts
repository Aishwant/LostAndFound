import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { UserService } from '../../providers/user-service/user-service';
import { ItemService } from '../../providers/item-service/Item-service';
import { FeedPage } from '../feed/feed';
import { EditPage } from '../edit/edit';
import { ChatPage } from '../chat/chat';

/**
 * Generated class for the ItemDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-item-details',
  templateUrl: 'item-details.html',
})
export class ItemDetailsPage {

  items: any;
  itemName: any;
  itemLocation: any;
  itemDescription: any;
  itemImgLocation: any;
  $key: any;
  queryFL:any;
  userOpt = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private userServ: UserService, private alertc: AlertController, private itemServ: ItemService) {

    this.items = this.navParams.get('item');
    this.itemName = this.items.itemN;
    this.itemLocation = this.items.itemLocation;
    this.itemDescription = this.items.itemDescription;
    this.itemImgLocation = this.items.itemImgLocation;
    this.$key = this.items.$key;
    this.queryFL = this.items.queryFL;
    if(this.userServ.userId.match(this.items.userId))
      this.userOpt = true;
  }

  getPosterN(){
    const a = this.userServ.getUsers(this.items.userId);
    let postUser=[];
    a.on('value',ab=>{
      postUser=ab.val();
    })
    return postUser;
  }

  delete(){
    try{
      this.itemServ.deleteItem(this.$key,this.queryFL);
      this.navCtrl.setRoot(FeedPage);
    }catch(e){
      this.alert("Couldn't delete");
    }
  }

  edit(){
    let myCallbackFunction = (param)=>{
      return new Promise((resolve,reject)=>{
        this.itemName=param.itemN;
        this.itemDescription= param.itemDescription;
        this.itemLocation = param.itemLocation;
        this.itemImgLocation = param.itemImgLocation;
        resolve();
      })
    };
    this.navCtrl.push(EditPage,{updateItem:true,item:this.items,$key:this.$key,queryFL:this.queryFL,callback:myCallbackFunction});
  }

  alert(event:string){
    let alert = this.alertc.create({
      title:event,
      buttons:['OK']
    })
    alert.present();
  }

  chat(){
    this.navCtrl.push(ChatPage,{userId:this.items.userId});
  }
}
