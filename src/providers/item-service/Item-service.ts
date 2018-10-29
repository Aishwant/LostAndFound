import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Items } from '../../models/item_interface';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class ItemService {

  items: AngularFireList<Items>;
  userId: string;
  itemArray=[];

  constructor(private db: AngularFireDatabase, private aAuth: AngularFireAuth) {
    this.aAuth.authState.subscribe(user => {
      if (user) this.userId = user.uid;
    })
    this.getItemslist("Found").subscribe(
      list => {
        this.itemArray[0] = list.map(i => {
          return {
            $key: i.key,
            ...i.payload.val()
          }
        });
      }
    );
    this.getItemslist("Lost").subscribe(
      list => {
        this.itemArray[1] = list.map(i => {
          return {
            $key: i.key,
            ...i.payload.val()
          }
        });
      }
    );

  }

  getItems(query: string):AngularFireList<Items>{
    if(!this.userId) return;
    this.items= this.db.list(`items/${query}`);
    return this.items;
  }

  getItemslist(query:string){
    this.items = this.db.list(`items/${query}`);
    return this.items.snapshotChanges();
  }

  createItem(item: Items,query:string){
    this.items =this.getItems(query);
    item.userId = this.userId;
    this.items.push(item);
  }

  filterItems(val,det){
    this.itemArray[2]=this.itemArray[0].concat(this.itemArray[1]);
    return this.itemArray[det].filter((item)=>{
      return item.itemN.toLowerCase().indexOf(val.toLowerCase()) > -1;
    })
  }
}
