import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';
import { FeedPage } from '../feed/feed';
import { UserContent } from '../../models/userContent_interface';
import { UserService } from '../../providers/user-service/user-service';
import { CameraService } from '../../providers/camera-service/camera-service';
import { Observable } from 'rxjs';
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
  base64Image:any="assets/imgs/me.jpg";

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,private uServ: UserService, private camServ: CameraService) {
  }

  nextpage(){
    this.slides.slideNext();
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

  alertPic(){
    const alert= this.alertCtrl.create({
      title:'How do you want to upload?',
      buttons:[{
        text:'Take a picture',
        handler:()=> {
          this.openCamera();
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
  openCamera(){
    this.base64Image = this.camServ.openCamera();
    this.alert();
  }
  alert(){
    const alert = this.alertCtrl.create({
      title:"Feature Coming soon",
      buttons:["Ok"]
    });
    alert.present();
  }

  fromGallery(){
    this.base64Image = this.camServ.fromGallery();
    this.alert();
  }

  notification(){
    this.alert();
  }

}