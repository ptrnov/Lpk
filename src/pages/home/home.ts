import { Component } from '@angular/core';
import { Platform,NavController,ToastController,Events } from 'ionic-angular';
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

formKecelakaan1=[];

  constructor(
    public navCtrl: NavController,
    private platform: Platform,
    public events: Events,
    private camera: Camera,
    public toastCtrl: ToastController
  ) {
    this.events.subscribe('profileLogin', (data:any) =>{
      const tgl = new Date();
      // var idNumber=tgl.getDate().toString()+tgl.getMonth().toString()+tgl.getFullYear().toString();
      var idNumberTimestamp=Math.floor(Date.now() / 1000);
      var rslt=[];
      // console.log("home1=",data);
      rslt['nomor']=idNumberTimestamp;
      rslt['polda']=data[0]['polda'];
      rslt['polwil']=data[0]['polwil'];
      this.formKecelakaan1.push(rslt);
      console.log("home=",rslt);
    });

    this.ports = [
      { id: 1, name: 'Piter' },
      { id: 2, name: 'Novian' },
      { id: 3, name: 'ptrnov' }
    ];
  }

  // ionViewDidEnter(){
  //    setTimeout(() => {

  //   }, 1000);
  // }


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
      }else{
        let toasPic = this.toastCtrl.create({
          message: 'Camera belum ada ...',
          duration: 3000,
          position: 'middle'
        });
        toasPic.present();
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
