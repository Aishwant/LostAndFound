// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from '../../models/user';
import * as firebase from 'firebase/app';
import { AlertController } from 'ionic-angular';
// import { NavController } from 'ionic-angular';
import { FeedPage } from '../../pages/feed/feed';


/*
  Generated class for the ServicesAuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServicesAuth{
  private user: firebase.User;

  constructor(private afAuth: AngularFireAuth,public alertCtrl: AlertController) {
    afAuth.authState.subscribe(user => {
      this.user = user
    });
  }

  // let credentials = {
  //   email: data.email,
  //   password: data.password
  // };

  signupWithEmail(email,password){
      return this.afAuth.auth.createUserWithEmailAndPassword(email,password);
  }
}
