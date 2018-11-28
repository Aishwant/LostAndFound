
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { UserContent } from '../../models/userContent_interface';
// import { ServicesAuth } from '../services-auth/services-auth';
// import { FeedPage } from '../../pages/feed/feed';
// import { NavController } from 'ionic-angular';

/*
  Generated class for the ItemServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class UserService {

  userContents:AngularFireObject<UserContent> = null;
  userId:string;



  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(user => {
      if (user) this.userId = user.uid
    })
  }

  getUsers(uid:string){
    return this.db.database.ref(`users/${uid}`);
  }


  createContent(userContent: UserContent){
    this.userContents = this.db.object(`users/${this.userId}`);
    this.userContents.set(userContent)
  }

  updateContent(userContent: UserContent){
    this.db.database.ref(`users/${this.userId}`).update(userContent);
  }

}
