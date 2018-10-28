import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { ItemDetailsPage } from '../item-details/item-details';
import { AngularFireAuth } from 'angularfire2/auth';
import { UserService } from '../../providers/user-service/user-service';
import { AngularFireList, AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Items } from '../../models/item_interface';
import { ItemService } from '../../providers/item-service/Item-service';
import { Observable } from 'rxjs/Observable';


@IonicPage()
@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html',
})
export class FeedPage {

  item = 'Found';

  items:AngularFireList<Items>;

  itemArrayF = [];
  itemArrayL = [];
  userId:string;
  check=false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public menu: MenuController, private db: AngularFireDatabase, private iServ: ItemService, private aAuth: AngularFireAuth) {
    this.menu.swipeEnable(true);
  }

  ionViewDidLoad(){
    this.iServ.getItemslist("Found").subscribe(
      list => {
        this.itemArrayF = list.map(i => {
          return {
            $key: i.key,
            ...i.payload.val()
          }
        });
      }
    );
    this.iServ.getItemslist("Lost").subscribe(
      list => {
        this.itemArrayL = list.map(i => {
          return {
            $key: i.key,
            ...i.payload.val()
          }
        });
      }
    );
    this.check = true;
  }

  itemName(type:any){
    if(type =="Found") return this.itemArrayF
    else return this.itemArrayL;
  }


  getDetails(itemN: any){
    this.navCtrl.push(ItemDetailsPage,{item: itemN});
  }
  getColor(item){
    if(item == "Found") return "primaryGreen";
    else return "primaryRed";
  }

}
