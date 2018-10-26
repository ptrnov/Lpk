import { Component } from '@angular/core';
import { Platform,NavController } from 'ionic-angular';
import { SelectSearchableComponent  } from 'ionic-select-searchable';
import { Camera,CameraOptions } from '@ionic-native/camera';

class Port {
  public id: number;
  public name: string;
}
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
ports: Port[];
port: Port;

  constructor(
    public navCtrl: NavController,
    private platform: Platform,
    private camera: Camera
  ) {
    this.ports = [
      { id: 1, name: 'Piter' },
      { id: 2, name: 'Novian' },
      { id: 3, name: 'ptrnov' }
    ];
  }



  public ambilPhoto(){
    this.platform.ready().then(() => {
      if (this.platform._platforms[0] == 'cordova') {
        const options: CameraOptions = {
          quality: 100,
          destinationType: this.camera.DestinationType.FILE_URI,
          encodingType: this.camera.EncodingType.JPEG,
          mediaType: this.camera.MediaType.PICTURE

        }

        this.camera.getPicture(options).then((imageData) => {
          // imageData is either a base64 encoded string or a file URI
          // If it's base64 (DATA_URL):
          let base64Image = 'data:image/jpeg;base64,' + imageData;
          console.log("dataImage" + base64Image);
         }, (err) => {
          console.log("erro image", err);
         });
      }
    });

  }


  portChange(event: {
    component: SelectSearchableComponent,
    value: any
  }) {
    console.log('port:', event);
  }

}
