import { Component } from '@angular/core';
import { Platform,IonicPage,LoadingController,ToastController,NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { Camera,CameraOptions } from '@ionic-native/camera';
import { Base64 } from '@ionic-native/base64';


@IonicPage()
@Component({
  selector: 'page-beritalantasadd',
  templateUrl: 'beritalantasadd.html',
})
export class BeritalantasaddPage {

  serialData = {"user_id": "1","text": "","status":"publish"};
  serialImage= {"image1":"","image2":"","image3":""};
  constructor(
    public platform:Platform,
    public navCtrl: NavController,
    public navParams: NavParams,
    public rest:RestProvider,
    public toastCtrl:ToastController,
    public loadingCtrl: LoadingController,
    private camera: Camera,
    private base64: Base64
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BeritalantasaddPage');
  }

  public submitBerita(){
    // http://localhost:8000/berita-lantas-insert
    // http://korlantas.api.cudo.co.id/berita-lantas-imagesinsert
    console.log("submid berita",this.serialData.text);
    this.rest.postData('berita-lantas-insert',this.serialData).then((data:any)=>{
      console.log("cari barcode",data);
    });

  }

  public ambilPhoto(event){
    console.log("src id=",event.srcElement.id);
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
          this.base64.encodeFile(imageData).then((base64File:string)=>{
            console.log("base64=",base64File);
          });
          console.log("dataImage" + imageData);
          var ImgDes1=<HTMLImageElement>document.getElementById(event.srcElement.id);
          ImgDes1.src=imageData;
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


}
