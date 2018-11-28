import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ServicesAuth } from '../../providers/services-auth/services-auth';
import { UserService } from '../../providers/user-service/user-service';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AngularFireStorage } from 'angularfire2/storage';
import { UserContent } from '../../models/userContent_interface';
import { ItemService } from '../../providers/item-service/Item-service';
import { Items } from '../../models/item_interface';
import { SettingsPage } from '../settings/settings';

/**
 * Generated class for the EditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit',
  templateUrl: 'edit.html',
})
export class EditPage {

  changePassword;
  updateProfile;
  updateItem;

  //user's password update
  newPwd:string;

  //user's content update
  fname:string;
  lname:string;
  userContent={} as UserContent;

  base64Image:any;
  imageCheck=false;

  userContentUpdate = {} as UserContent;

  //item update
  items:any;
  $key:any;
  queryFL:any;
  showPic=true;
  itemPicShow:any;

  itemContent = {} as Items;

  callback:any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private sAuth: ServicesAuth,
    private alertCtrl: AlertController,
    private userServ: UserService,
    private afStorage: AngularFireStorage,
    private camera: Camera,
    private itemServ: ItemService,
    ) {
    this.changePassword = this.navParams.get('changePassword');
    this.updateProfile = this.navParams.get('updateProfile');
    this.updateItem = this.navParams.get('updateItem');
    this.items = this.navParams.get('item');
    this.$key = this.navParams.get('$key');
    this.queryFL = this.navParams.get('queryFL');
    this.callback = this.navParams.get('callback');
  }
  ngOnInit(){
    const a = this.userServ.getUsers(this.userServ.userId);
    a.on('value',ab=>{
      this.userContent=ab.val();
    })
  }

  updatePwd(){
    this.sAuth.changePassword(this.newPwd)
    .then(
      () => {
        const alert = this.alertCtrl.create({
          subTitle: "Password updated",
          buttons: ['OK']
        })
        alert.present();
      },
      error =>{
        const alert = this.alertCtrl.create({
          subTitle: error,
          buttons: ['OK']
        })
        alert.present();
      }
    )

  }

  //user content update
  updateProf(){
    this.userServ.updateContent(this.userContentUpdate);
    this.navCtrl.setRoot(SettingsPage);
  }

  alert(){
    const alert1=this.alertCtrl.create({
      title:"Feature coming soon",
      buttons:["OK"]
    })
    alert1.present();
  }

  alertPic(){
    const alert= this.alertCtrl.create({
      title:'How do you want to upload?',
      buttons:[{
        text:'Take a picture',
        handler:()=> {
          this.openCamera();
          // this.alert();
        }
      },
      {
        text:'From Gallery',
        handler:()=> {
          this.fromGallery();
          // this.alert();
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
  }

  uploadTofirebase(event){
    if(this.updateProfile)
      this.afStorage.ref(`img/users/${this.userServ.userId}.jpg`).putString(event,'data_url').then(url =>{
        url.ref.getDownloadURL().then(imgurl=>{
          this.userContent.imgLocation=this.userContentUpdate.imgLocation=imgurl;

        })
      });
    else
      this.afStorage.ref(`img/lost/${this.$key}.jpg`).putString(event,'data_url').then(url =>{
        url.ref.getDownloadURL().then(imgurl=>{
          this.items.itemImgLocation=this.itemContent.itemImgLocation=imgurl;
        })
      });

  }

  //update item
  updateItemOn(items){
    this.itemContent.itemN=this.items.itemN;
    this.itemContent.itemDescription=this.items.itemDescription;
    this.itemContent.itemLocation=this.items.itemLocation;
    if(!this.showPic){
      this.itemContent.itemImgLocation=null;
    }
    try{
      this.itemServ.updateItem(this.itemContent,this.queryFL,this.$key);
      //callback function
      this.callback(this.itemContent).then(()=>{
        this.navCtrl.pop();
      });
    }
    catch(e){
      let alert = this.alertCtrl.create({
        title:"Couldn't update",
        buttons:['ok']
      })
      alert.present();
    }
  }

  deletePic(){
    this.showPic=false;
  }
}
