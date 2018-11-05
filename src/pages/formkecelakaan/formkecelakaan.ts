import { Component } from '@angular/core';
import { IonicPage,Platform,NavController,NavParams,ToastController,Events } from 'ionic-angular';
import { SelectSearchableComponent  } from 'ionic-select-searchable';
import { Camera,CameraOptions } from '@ionic-native/camera';
import { DatePicker } from '@ionic-native/date-picker';
import { Base64 } from '@ionic-native/base64';

@IonicPage()
@Component({
  selector: 'page-formkecelakaan',
  templateUrl: 'formkecelakaan.html',
})
export class FormkecelakaanPage {
  getProfile=[];
  getAutoNumber=[];
  constructor(
    public navParams: NavParams,
    public navCtrl: NavController,
    private platform: Platform,
    public events: Events,
    private camera: Camera,
    public toastCtrl: ToastController,
    private datePicker: DatePicker,
    private base64: Base64
  ){
    document.addEventListener("backbutton", onBackKeyDown, false);
    function onBackKeyDown(e) {
      this.navCtrl.pop();
      // e.preventDefault();
      alert('Back Button is Pressed!');
    }
    // document.addEventListener("backbutton", onBackKeyDown, false);
    // function onBackKeyDown(e) {
    //   e.preventDefault();
    //   // alert('Back Button is Pressed!');
    //   this.navCtrl.popToRoot({ animate: true, direction: 'back' })
    // }
  }

  ionViewDidEnter(){
    var rslt=[];
    var idNumberTimestamp=Math.floor(Date.now() / 1000);
    rslt['nomor']=idNumberTimestamp;
    setTimeout(() => {
      this.getAutoNumber=rslt;
      console.log("checkNumber=",this.getAutoNumber);

      const data = JSON.parse(localStorage.getItem('profileLogin'));
      this.getProfile=data;
      console.log("storage=",this.getProfile);
    }, 100);
  }

  showDatePicker(){
    this.platform.ready().then(() => {
      if (this.platform._platforms[0] == 'cordova') {
        this.datePicker.show({
          date: new Date(),
          mode: 'date',
          androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_LIGHT
          //THEME_TRADITIONAL | THEME_HOLO_DARK | THEME_HOLO_LIGHT | THEME_DEVICE_DEFAULT_DARK | THEME_DEVICE_DEFAULT_LIGHT
        }).then(
          date => {
            var strTgl=date.getDate() + "-" + date.getMonth() +"-"+date.getFullYear();
            document.getElementById("tgl").innerHTML=strTgl;
            console.log('Got date: ', strTgl);
          },
          err => console.log('Error occurred while getting date: ', err)
        );
      }else{
        let toasTgl = this.toastCtrl.create({
          message: 'Tanggal run on Android Device ...',
          duration: 1000,
          position: 'middle'
        });
        toasTgl.present();
      }
    });
  }

  showJamPicker(){
      this.platform.ready().then(() => {
        if (this.platform._platforms[0] == 'cordova') {
          this.datePicker.show({
            date: new Date(),
            mode: 'time',
            androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_LIGHT
            //THEME_TRADITIONAL | THEME_HOLO_DARK | THEME_HOLO_LIGHT | THEME_DEVICE_DEFAULT_DARK | THEME_DEVICE_DEFAULT_LIGHT
          }).then(
            date => {
              var strJam=date.getHours() + ":" + date.getMinutes() +":"+date.getSeconds();
              document.getElementById("jam").innerHTML=strJam;
              console.log('Got date: ', strJam);
            },
            err => console.log('Error occurred while getting date: ', err)
          );
        }else{
          let toasJam = this.toastCtrl.create({
            message: 'Waktu run on Android Device ...',
            duration: 1000,
            position: 'middle'
          });
          toasJam.present();
        }
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
