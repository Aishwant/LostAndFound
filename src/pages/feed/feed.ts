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
  ListRef$: Observable<any[]>;
  // items: any = {
  //   "Found Items":[
  //     {
  //       itemName:'Computer',
  //       itemLocation: 'Weir Hall',
  //       itemDescription: 'A macbook pro 13',
  //       itemPicture: 'assets/imgs/macbook.jpg'
  //     },
  //     {
  //       itemName:'Book',
  //       itemLocation: 'J.D. Williams',
  //       itemDescription: 'Law VS Power',
  //       itemPicture: 'assets/imgs/book.jpg'
  //     }
  //   ],
  //   "Lost Items":[
  //     {
  //       itemName:'Charger',
  //       itemLocation: 'Library',
  //       itemDescription: ''
  //     }
  //   ]
  // };
  itemArrayF = [];
  itemArrayL = [];
  userId:string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public menu: MenuController, private db: AngularFireDatabase, private iServ: ItemService, private aAuth: AngularFireAuth) {
    this.menu.swipeEnable(true);
    // this.items = this.db.list('/items');
    var data = this.db.database.ref(`items/${this.item}`);
    // data.on('value', function(snapshot){
    //   console.log(snapshot.val());
    //   console.log(snapshot.key);
    //   this.items = snapshot.val();
    // });
    
    // console.log(this.ListRef$);
  }

  ngOnInit(){
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
  }

  itemName(type:any){
    if(type =="Found") return this.itemArrayF
    else return this.itemArrayL;
  }
  // itemName(type:any){
  //   this.items = this.iServ.getItems(type);
  //   this.ListRef$=this.items.valueChanges();

  //   console.log(this.iServ.getItems(type+"/-LPKaRZQGIYITQpcGao-"));
  //   console.log(this.ListRef$)

  //   return this.ListRef$;
  // }

  // itemLocation(){
  //   return this.items.itemLocation;
  // }


  getDetails(itemN: any){
    this.navCtrl.push(ItemDetailsPage,{item: itemN});
  }
  getColor(item){
    if(item == "Found") return "primaryGreen";
    else return "primaryRed";
  }

}
