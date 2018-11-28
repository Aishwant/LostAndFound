import { Injectable } from '@angular/core';
import { Diagnostic } from '@ionic-native/diagnostic';


@Injectable()
export class DiagnosticProvider {

  constructor(private diagnostic: Diagnostic) {
  }

  diagnosticRequestCameraAccess(){ 
    // let successCallback = (isAvailable) => { console.log('Is available? ' + isAvailable); };
    // let errorCallback = (e) => console.error(e);

    // this.diagnostic.requestCameraAuthorization().then(successCallback).catch(errorCallback);
    this.diagnostic.isCameraAuthorized().then((authorized) => {
      if(authorized)
          return true;
      else {
          this.diagnostic.requestCameraAuthorization().then((status) => {
              if(status == this.diagnostic.permissionStatus.GRANTED)
                  return true;
              else {
                  // Permissions not granted
                  // Therefore, create and present toast
                  return false;
              }
          });
      }
  });
  return false;
  }
}
