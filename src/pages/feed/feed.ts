import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { ItemDetailsPage } from '../item-details/item-details';
import { UserService } from '../../providers/user-service/user-service';
import { AngularFireDatabase } from 'angularfire2/database';
import { ItemService } from '../../providers/item-service/Item-service';
import { FoundPage } from '../found/found';
import { LostPage } from '../lost/lost';


@IonicPage()
@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html',
})
export class FeedPage {

  item = 'Found';


  itemArrayF:Array<any>;
  itemArrayL = [];
  UserContent =[];
  postUser=[];
  usersIds=[];
  check=false;
  searchVal:string='';

  constructor(public navCtrl: NavController, public navParams: NavParams, public menu: MenuController, private db: AngularFireDatabase, private iServ: ItemService, private uServ: UserService) {
    this.menu.swipeEnable(true);
  }

  ngOnInit(){
    this.iServ.getItemslist("Found").subscribe(
      list => {
        this.itemArrayF = list.map(i => {
          return {
            $key: i.key,
            ...i.payload.val(),
            queryFL: "Found"
          }
        });
      }
    );
    this.iServ.getItemslist("Lost").subscribe(
      list => {
        this.itemArrayL = list.map(i => {
          return {
            $key: i.key,
            ...i.payload.val(),
            queryFL: "Lost"
          }
        });
      }
    );
    this.filterItems(this.item);
  }

  ionViewDidLoad(){
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

  filterItems(item){
    try{
      if(item == "Found")
        this.itemArrayF = this.iServ.filterItems(this.searchVal,0);
      else if(item == "Lost")
        this.itemArrayL = this.iServ.filterItems(this.searchVal,1);
    }catch{}
  }

  found(){
    this.navCtrl.push(FoundPage);
  }

  lost(){
    this.navCtrl.push(LostPage);
  }
}
