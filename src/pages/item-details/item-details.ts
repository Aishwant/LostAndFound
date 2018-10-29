import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { UserService } from '../../providers/user-service/user-service';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private uServ: UserService, private alertc: AlertController) {

    this.items = this.navParams.get('item');
    this.itemName = this.items.itemN;
    this.itemLocation = this.items.itemLocation;
    this.itemDescription = this.items.itemDescription;

  }

  getPosterN(){
    const a = this.uServ.getUsers(this.items.userId);
    let postUser=[];
    a.on('value',ab=>{
      postUser=ab.val();
    })
    return postUser;
  }

  alert(){
    let alert = this.alertc.create({
      title:"Feature coming soon",
      buttons:['OK']
    })
    alert.present();
  }
}
