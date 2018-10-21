import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Items } from '../../models/item_interface';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class ItemService {

  items: AngularFireList<Items>;
  userId: string;

  constructor(private db: AngularFireDatabase, private aAuth: AngularFireAuth) {
    this.aAuth.authState.subscribe(user => {
      if (user) this.userId = user.uid;
    })
  }

  getItems(query: string):AngularFireList<Items>{
    if(!this.userId) return;
    this.items= this.db.list(`items/${query}`);
    return this.items;
  }

  createItem(item: Items,query:string){
    this.items =this.getItems(query);
    item.userId = this.userId;
    this.items.push(item);
  }
}
