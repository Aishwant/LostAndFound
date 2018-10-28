import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AlertController } from 'ionic-angular';
import { Observable } from 'rxjs';

@Injectable()
export class CameraService {

  obj: Observable<string>;
  constructor(private camera: Camera, public alertCtrl: AlertController) {

  }

  openCamera(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    let photoLoc = null;
    this.camera.getPicture(options).then((imageData) => {
        photoLoc = "data:image/jpeg;base64,"+imageData;
    },(err)=>{
      console.log(err);
    });
    return photoLoc;
  }

  fromGallery(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }
    let photoLoc = null;
    this.camera.getPicture(options).then((imageData) => {
        photoLoc = ("data:image/jpeg;base64,"+imageData);
        this.obj = photoLoc;
    },(err)=>{
      console.log(err);
    });
    return this.obj;
  }


}
