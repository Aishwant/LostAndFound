import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Items } from '../../models/item_interface';
import { ItemService } from '../../providers/item-service/Item-service';
import { FeedPage } from '../feed/feed';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AngularFireStorage } from 'angularfire2/storage';
import { UserService } from '../../providers/user-service/user-service';

/**
 * Generated class for the LostPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lost',
  templateUrl: 'lost.html',
})
export class LostPage {

  items = {} as Items;
  imgCheck=false;
  base64Image: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private iServ: ItemService,
    private alertCtrl: AlertController,
    private camera: Camera,
    private afStorage: AngularFireStorage,
    private userServ: UserService,
    ) {
  }

  newLost(items: Items){
    if(items.itemN&&items.itemDescription&&items.itemLocation&&items.itemN.trim()!=''&&items.itemDescription.trim()!=''&&items.itemLocation.trim()!=''){
      this.iServ.createItem(items,"Lost");
      this.navCtrl.setRoot(FeedPage);
    }else{
      const alert = this.alertCtrl.create({
        subTitle: "Please fill the fields correctly",
        buttons:['OK']
      });
      alert.present();
    }
  }

  upload(){
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
      quality: 70,
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
        quality: 70,
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
    let path = `img/lost/${this.userServ.userId}${Math.floor((Math.random()*100)+1)}.jpg`;
    let store = this.afStorage.ref(path).putString(event,'data_url').then(url =>{
      url.ref.getDownloadURL().then(imgurl=>{
        this.items.itemImgLocation=imgurl;
      })
    });

  }
  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad LostPage');
  // }

}
