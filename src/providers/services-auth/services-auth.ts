// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { AlertController } from 'ionic-angular';

import { User } from '../../models/user_interface';


/*
  Generated class for the ServicesAuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServicesAuth{
  private user: firebase.User;
  constructor(private afAuth: AngularFireAuth,public alertCtrl: AlertController) {
  }

  // let credentials = {
  //   email: data.email,
  //   password: data.password
  // };

  signupWithEmail(userIf: User){
      return this.afAuth.auth.createUserWithEmailAndPassword(userIf.email,userIf.password);
  }

  loginVerificationEmail(userIf: User){
    return this.afAuth.auth.signInWithEmailAndPassword(userIf.email,userIf.password);
  }

  resetPasswordEmail(userIf: User){
    return this.afAuth.auth.sendPasswordResetEmail(userIf.email);
  }

}
