import { Component } from '@angular/core';
import { IonicPage, NavController, MenuController } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { FeedPage } from '../feed/feed';
import { AlertController } from 'ionic-angular';
import { User } from '../../models/user_interface';
import { ServicesAuth } from '../../providers/services-auth/services-auth';
import { ForgotpwdPage } from '../forgotpwd/forgotpwd';
import { AngularFireDatabase } from 'angularfire2/database';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user = {} as User;
  toggleState=false;
  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public menu: MenuController, private sAuth: ServicesAuth, private db: AngularFireDatabase) {
    this.menu.swipeEnable(false);
    console.log(this.toggleState);
  }

  login(user: User){
    if(/^[a-zA-Z0-9_@.]+$/.test(user.email) && user.password){ //validity check
      this.sAuth.loginVerificationEmail(user)
      .then(
        () =>{
        if(this.toggleState){
          localStorage.setItem("rememberMe",this.toggleState+"");
          localStorage.setItem("email",this.user.email);
          localStorage.setItem("password",this.user.password);
          console.log("reached")
        }
        this.navCtrl.setRoot(FeedPage)
        },error =>{
          const alert = this.alertCtrl.create({
          title: "Invalid",
          subTitle: "The Email or Password is incorrect",
          buttons: ['OK']
        });
        alert.present();
        localStorage.clear();
        }
        );
    }else{
      const alert = this.alertCtrl.create({
        title: "Invalid",
        subTitle: "Please fill all the fields correctly",
        buttons: ['OK']
      });
      alert.present();
    }

  }
  redirectTo_SignUp(){
    this.navCtrl.push(SignupPage);
  }

  redirectTo_forgotpwd(){
    this.navCtrl.push(ForgotpwdPage);
  }

  stateChangeToggle(){
    if(this.toggleState) this.toggleState=false;
    else this.toggleState=true;
  }

  ionViewDidEnter(){
    if(localStorage.getItem("rememberMe")){
      this.user.email=localStorage.getItem("email");
      this.user.password=localStorage.getItem("password");
      this.login(this.user);
    }
  }
}
