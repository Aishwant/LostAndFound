import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ItemService } from '../../providers/item-service/Item-service';
import { ItemDetailsPage } from '../item-details/item-details';

/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  items:Array<any>=[];
  searchVal:string="";
  constructor(public navCtrl: NavController, public navParams: NavParams, private iServ: ItemService) {
  }

  filterItems(){
    this.items = this.iServ.filterItems(this.searchVal,2);
  }

  getDetails(i){
    this.navCtrl.push(ItemDetailsPage,{item: i});
  }
}
