import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Items } from '../../models/item_interface';
import { ItemService } from '../../providers/item-service/Item-service';
import { FeedPage } from '../feed/feed';

/**
 * Generated class for the LostPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lost',
  templateUrl: 'lost.html',
})
export class LostPage {

  items = {} as Items;
  constructor(public navCtrl: NavController, public navParams: NavParams, private iServ: ItemService) {
  }

  newLost(items: Items){
    this.iServ.createItem(items,"Lost");
    this.navCtrl.setRoot(FeedPage);
  }

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad LostPage');
  // }

}
