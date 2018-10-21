import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Items } from '../../models/item_interface';
import { ItemService } from '../../providers/item-service/Item-service';
import { FeedPage } from '../feed/feed';

/**
 * Generated class for the FoundPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-found',
  templateUrl: 'found.html',
})
export class FoundPage {

  items= {} as Items;

  constructor(public navCtrl: NavController, public navParams: NavParams, private iServ: ItemService) {
  }

  newFound(items: Items){
    this.iServ.createItem(items,"Found");
    this.navCtrl.setRoot(FeedPage);
  }


  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad FoundPage');
  // }

}
