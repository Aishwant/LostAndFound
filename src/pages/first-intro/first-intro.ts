import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';
import { FeedPage } from '../feed/feed';
import { UserContent } from '../../models/userContent_interface';
import { UserService } from '../../providers/user-service/user-service';
import { ServicesAuth } from '../../providers/services-auth/services-auth';
/**
 * Generated class for the FirstIntroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-first-intro',
  templateUrl: 'first-intro.html',
})
export class FirstIntroPage {
  @ViewChild(Slides) slides: Slides;

  userContent= {} as UserContent;
  userId:string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,private uServ: UserService) {
  }

  slideChanged() {
    let currentIndex = this.slides.getActiveIndex();
    console.log('Current index is', currentIndex);
  }

  createContent(userContent : UserContent){

    if(!userContent.fname){
      const alert = this.alertCtrl.create({
        title: "Please fill your Name",
        buttons: ['OK']
      });
      alert.present();
    }
    else{
     this.uServ.createContent(userContent);
     this.navCtrl.setRoot(FeedPage);
    }
  }

  uploadPic(){
    const alert= this.alertCtrl.create({
      title:'How do you want to upload?',
      buttons:[{
        text:'Take a picture',
        handler:()=> {
          this.camera();
        }
      },
      {
        text:'From Gallery',
        handler:()=> {
          this.fromGallery();
        }
      }]
    });
    alert.present();
  }
  camera(){
    console.log('Take a picture');
  }

  fromGallery(){
    console.log('From Gallery');
  }
}