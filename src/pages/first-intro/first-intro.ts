import { Component, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, normalizeURL } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';
import { FeedPage } from '../feed/feed';
import { UserContent } from '../../models/userContent_interface';
import { UserService } from '../../providers/user-service/user-service';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AngularFireStorage } from 'angularfire2/storage';


@IonicPage()
@Component({
  selector: 'page-first-intro',
  templateUrl: 'first-intro.html',
})
export class FirstIntroPage {
  @ViewChild(Slides) slides: Slides;

  userContent= {} as UserContent;
  base64Image:any;
  imageURI:string="";
  imgCheck=false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    private uServ: UserService,
    private camera: Camera,
    private afStorage: AngularFireStorage,
    private userServ: UserService,
    private cdr: ChangeDetectorRef
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
    //  this.userContent.imgLocation = this.imageURI;
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

    const options: CameraOptions = {
      quality: 50,
      targetHeight: 600,
      targetWidth: 600,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
    }
    this.camera.getPicture(options).then((imageData) => {
      this.base64Image = 'data:image/jpeg;base64,'+imageData;
      this.uploadTofirebase(this.base64Image);
    }, (err) => {
      //handle error
    });
    this.imgCheck=true
  }

  fromGallery(){
      const options: CameraOptions = {
        quality: 50,
        targetHeight: 600,
      targetWidth: 600,
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
      this.imgCheck=true;
  }

  uploadTofirebase(event){

    let store = this.afStorage.ref(`img/users/${this.userServ.userId}.jpg`).putString(event,'data_url').then(url =>{
      url.ref.getDownloadURL().then(imgurl=>{
        this.userContent.imgLocation=imgurl;
      })
    });

  }

  notification(){
    this.alert();
  }
  alert(){
    const alert = this.alertCtrl.create({
      title: "Feature coming soon",
      buttons: ['OK']
    })
    alert.present();
  }
}