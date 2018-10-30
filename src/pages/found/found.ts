import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private iServ: ItemService, private alertCtrl: AlertController) {
  }

  newFound(items: Items){
    if(items.itemN&&items.itemDescription&&items.itemLocation&&items.itemN.trim()!=''&&items.itemDescription.trim()!=''&&items.itemLocation.trim()!=''){
      this.iServ.createItem(items,"Found");
      this.navCtrl.setRoot(FeedPage);
    }else{
      const alert = this.alertCtrl.create({
        subTitle: "Please fill the fields correctly",
        buttons:['OK']
      });
      alert.present();
    }
  }


}
