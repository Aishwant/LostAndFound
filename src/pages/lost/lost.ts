import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
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
  constructor(public navCtrl: NavController, public navParams: NavParams, private iServ: ItemService, private alertCtrl: AlertController) {
  }

  newLost(items: Items){
    if(items.itemN&&items.itemDescription&&items.itemLocation&&items.itemN.trim()!=''&&items.itemDescription.trim()!=''&&items.itemLocation.trim()!=''){
      this.iServ.createItem(items,"Lost");
      this.navCtrl.setRoot(FeedPage);
    }else{
      const alert = this.alertCtrl.create({
        subTitle: "Please fill the fields correctly",
        buttons:['OK']
      });
      alert.present();
    }
  }

  upload(){
    const alert = this.alertCtrl.create({
      subTitle: "Feature coming out soon",
      buttons:['OK']
    });
    alert.present();
  }
  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad LostPage');
  // }

}
