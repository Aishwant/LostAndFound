import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, normalizeURL } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';
import { FeedPage } from '../feed/feed';
import { UserContent } from '../../models/userContent_interface';
import { UserService } from '../../providers/user-service/user-service';
import { Observable } from 'rxjs';
import { Camera, CameraOptions } from '@ionic-native/camera';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'firebase/storage';
import { AngularFireStorage } from 'angularfire2/storage';


@IonicPage()
@Component({
  selector: 'page-first-intro',
  templateUrl: 'first-intro.html',
})
export class FirstIntroPage {
  @ViewChild(Slides) slides: Slides;

  userContent= {} as UserContent;
  userId:string;
  base64Image:any;
  imageURI:any;
  obj: Observable<string>;
  task;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    private uServ: UserService,
    private camera: Camera,
    private afStorage: AngularFireStorage
    )
  {

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

  ionViewDidLoad(){
    this.base64Image;
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
    // try{
    const options: CameraOptions = {
      quality: 50,
      targetHeight: 600,
      targetWidth: 600,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
    }
    const img = this.camera.getPicture(options).then((imageData) => {
      this.base64Image = 'data:image/jpeg;base64,'+imageData;
      this.uploadTofirebase(this.base64Image);
    }, (err) => {
      //handle error
    });
  }

  fromGallery(){
      const options: CameraOptions = {
        quality: 50,
        destinationType: this.camera.DestinationType.DATA_URL,
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
        saveToPhotoAlbum:false
      }
      this.camera.getPicture(options).then((imageData) => {
        this.base64Image = 'data:image/jpeg;base64,'+imageData;
        this.uploadTofirebase(this.base64Image);
      }, (err) => {
        //handle error
      });

  }

  uploadTofirebase(event){
    this.afStorage.ref('img/demo.jpg').putString(event,'data_url');
  }

  notification(){
    // this.alert();
  }

}