import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { ItemDetailsPage } from '../item-details/item-details';

@IonicPage()
@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html',
})
export class FeedPage {

  item = 'Found Items';

  items: any = {
    "Found Items":[
      {
        itemName:'Computer',
        itemLocation: 'Weir Hall',
        itemDescription: 'A macbook pro 13',
        itemPicture: 'assets/imgs/macbook.jpg'
      },
      {
        itemName:'Book',
        itemLocation: 'J.D. Williams',
        itemDescription: 'Law VS Power',
        itemPicture: 'assets/imgs/book.jpg'
      }
    ],
    "Lost Items":[
      {
        itemName:'Charger',
        itemLocation: 'Library',
        itemDescription: ''
      }
    ]
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, public menu: MenuController) {
    this.menu.swipeEnable(true);
  }

  itemName(type:any){
    return this.items[type];
  }

  itemLocation(){
    return this.items.itemLocation;
  }

  getDetails(itemN: any){
    this.navCtrl.push(ItemDetailsPage,{item: itemN});
  }
  getColor(item){
    if(item == "Found Items") return "primaryGreen";
    else return "primaryRed";
  }
}
