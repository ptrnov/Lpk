import { Component } from '@angular/core';
import { Platform,NavController,ToastController,Events } from 'ionic-angular';
import { SelectSearchableComponent  } from 'ionic-select-searchable';
import { Camera,CameraOptions } from '@ionic-native/camera';
import { DatePicker } from '@ionic-native/date-picker';
import { SimPage } from '../../pages/sim/sim';
import { NokendaraanPage } from '../../pages/nokendaraan/nokendaraan';
import { FormkecelakaanPage } from '../../pages/formkecelakaan/formkecelakaan';
import { TilangPage } from '../../pages/tilang/tilang';
import { BeritalantasPage } from '../../pages/beritalantas/beritalantas';
import { BeritapoldaPage } from '../../pages/beritapolda/beritapolda';
import { PetalantasPage } from '../../pages/petalantas/petalantas';
import { RestProvider } from '../../providers/rest/rest';

class Port {
  public id: number;
  public name: string;
}
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

userProfile=[];

  constructor(
    public navCtrl: NavController,
    private platform: Platform,
    public events: Events,
    private camera: Camera,
    public toastCtrl: ToastController,
    private datePicker: DatePicker,
    public rest:RestProvider
  ) {
    // this.events.subscribe('profileLogin', (data:any) =>{
    //   const tgl = new Date();
    //   // var idNumber=tgl.getDate().toString()+tgl.getMonth().toString()+tgl.getFullYear().toString();
    //   var idNumberTimestamp=Math.floor(Date.now() / 1000);
    //   var rslt=[];
    //   // console.log("home1=",data);
    //   rslt['nomor']=idNumberTimestamp;
    //   rslt['nama']=data[0]['nama'];
    //   rslt['polda']=data[0]['polda'];
    //   rslt['polwil']=data[0]['polwil'];
    //   //this.userProfile.push(rslt);
    //   console.log("home=",rslt);
    // });
  }

  ionViewDidEnter(){
    setTimeout(() => {
      const data = JSON.parse(localStorage.getItem('profileLogin'));
      this.userProfile.push(data[0]);
      console.log("home storage=",this.userProfile);
    }, 1000);
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

  public bukaSim(){
    this.navCtrl.setRoot(SimPage);
  }
  public bukaKendaraan(){
    this.navCtrl.setRoot(NokendaraanPage);
  }
  public bukaKecelakaan(){
    this.navCtrl.setRoot(FormkecelakaanPage);
  }
  public bukaTilang(){
    this.navCtrl.setRoot(TilangPage);
  }
  public bukaBeritapolda(){
    this.navCtrl.setRoot(BeritapoldaPage);
  }
  public bukaBeritalantas(){
    this.navCtrl.setRoot(BeritalantasPage);
  }
  public bukaPetalantas(){
    this.navCtrl.setRoot(PetalantasPage);
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
          var base64Image = 'data:image/jpeg;base64,' + imageData;
          console.log("dataImage" + imageData);
          var ImgDes1=<HTMLImageElement>document.getElementById("pic1");
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

  public testApiKendaraan(){
    var paramCari={
      "no_polisi": "B"
    }
    this.rest.postData('kendaraan',paramCari).then((data:any)=>{
      console.log("data-kendaraan",data.result.data);
    });
  }

  public testApiSim(){
    var paramCari={
      "sim_no": "785876576",
      // "nama": "Anjar Dp",
      // "lahir_tgl": "2018-11-21",
    }
    this.rest.postData('sim',paramCari).then((data:any)=>{
      console.log("data-SIM",data);
    });
  }
}
