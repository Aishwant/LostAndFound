import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
  itemID: any;
  itemName: any;
  itemLocation: any;
  itemDescription: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.items = this.navParams.get('item');
    this.itemName = this.items.itemName;
    this.itemLocation = this.items.itemLocation;
    this.itemDescription = this.items.itemDescription;

  }

}
