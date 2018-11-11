import { ViewChild,Component } from '@angular/core';
import { Searchbar,IonicPage, NavController,LoadingController, ToastController,NavParams, Platform } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { RestProvider } from '../../providers/rest/rest';
// import QRCode from 'qrcode';
import { oflineDataSim } from "./data";

let cariId:any;
let brcodeStt:any=0;
@IonicPage()
@Component({
  selector: 'page-sim',
  templateUrl: 'sim.html',
})
export class SimPage {
  @ViewChild('q') searchbar:Searchbar;
  public columns_datasim : any;
  public rows_datasim : any;
  public image_datasim : any;

  public columns_riwayatsim: any;
  public rows_riwayatsim: any;

  public encodeData : string=window.localStorage.getItem("auth_key");;
  public encodedData : {} ;

  qrData = null;
  createdCode = null;
  scannedCode = null;

  public nilaiVarcode;

  private spinnerSim;

  constructor(
      public navCtrl: NavController,
      private platform: Platform,
      public navParams: NavParams,
      private barcodeScanner: BarcodeScanner,
      public rest:RestProvider,
      public toastCtrl:ToastController,
      public loadingCtrl: LoadingController,
  ){
    // this.barcodeScanner.encode('QR_CODE','1348180502933');
    // this.barcodeScanner.encode(this.barcodeScanner.Encode.TEXT_TYPE,'1348180502933').then((encodedData) => {
    //     console.log(encodedData);
    //     this.encodedData = encodedData;

    // }, (err) => {
    //     console.log("Error occured : " + err);
    // });

    this.columns_datasim=[
      { name: 'Title',prop: 'Title', width: 120},
      { name: 'Sma',prop: 'Sma', width: 5 },
      { name: 'Keterangan',prop: 'Keterangan' }
    ]
    this.image_datasim="assets/imgs/avatar1.jpg";
    // this.rows_datasim = [
    //   {'Title':'No.SIM','Sma':':','Keterangan':''},
    //   {'Title':'Type.SIM','Sma':':','Keterangan':''},
    //   {'Title':'Berlaku','Sma':':','Keterangan':''},
    //   {'Title':'No.SIM','Sma':':','Keterangan':''},
    //   {'Title':'Nama','Sma':':','Keterangan':''},
    //   {'Title':'Tempat','Sma':':','Keterangan':''},
    //   {'Title':'Tgl.Lahir','Sma':':','Keterangan':''},
    //   {'Title':'Tinggi','Sma':':','Keterangan':''},
    //   {'Title':'Pekerjaan','Sma':':','Keterangan':''},
    //   {'Title':'Alamat','Sma':':','Keterangan':''},
    // ];

    this.columns_riwayatsim = [
      { name: 'Tanggal',prop: 'Tanggal', width: 40 },
      { name: 'Pelangaran',prop: 'Pelangaran'}
    ];

    // this.rows_riwayatsim = [
    //   {'Tanggal':'12-12-2018 11:02:08','Waktu':'07:02:08','Pelangaran':'Tidak Pakai Helem'},
    //   {'Tanggal':'12-12-2017 01:02:08','Waktu':'07:02:08','Pelangaran':'Tidak ada STNK'},
    //   {'Tanggal':'12-12-2016 07:02:08','Waktu':'07:02:08','Pelangaran':'Lampu Depan Mati'},
    // ];
  }

  createCode() {
    this.createdCode = '123';//this.qrData;
  }

  ionViewDidLoad() {
    setTimeout(() => {
      document.getElementById("cari_namasim").hidden=true;
      document.getElementById("data-sim1").hidden=true;
      document.getElementById("data-sim2").hidden=true;
      document.getElementById("data-sim3").hidden=true;
    }, 100);
  }

  public radioklik(event:Event){
    var rslt:any;
    rslt=event;
    console.log("radio=",event);
    if (rslt=="nosim"){
      document.getElementById("cari_nosim").hidden=false;
      document.getElementById("cari_nosim").style.backgroundColor="#ffd101";
      document.getElementById("cari_namasim").hidden=true;
    }else if(rslt=="namasim"){
      document.getElementById("cari_nosim").hidden=true;
      document.getElementById("cari_namasim").hidden=false;
      document.getElementById("cari_namasim").style.background="#ffd101";
    };
  }

  /**
   * Enter  Data
   * @param event
   */
  public cari1(event:any){
    console.log("cari sim=",event);
    var pathImg;
    var paramCari;
    paramCari={
      "sim_no": event,
      //"sim_no": "785876576",
      // "nama": "Anjar Dp",
      // "lahir_tgl": "2018-11-21",
    };

    //Prosess Pencarian Data.
    if (event!=''){

        document.getElementById("data-sim1").hidden=true;
        document.getElementById("data-sim2").hidden=true;
        document.getElementById("data-sim3").hidden=true;

        this.spinnerSim = this.loadingCtrl.create({
          spinner:'bubbles',
          content: 'Persiapan data, Silakan Tunggu...'
        });
        this.spinnerSim.present();

        setTimeout(() => {
          this.rest.postData('sim',paramCari).then((data:any)=>{
            console.log("cari barcode",data);
              if (data.result.total==1){
                pathImg=data.url_image;
                document.getElementById("data-sim1").hidden=false;
                document.getElementById("data-sim2").hidden=false;
                document.getElementById("data-sim3").hidden=false;

                this.spinnerSim.dismiss();


                var nmImg =data.result.data[0].gambar;
                this.image_datasim=pathImg + nmImg;
                this.rows_datasim = [
                  {'Title':'No.SIM','Sma':':','Keterangan':data.result.data[0].sim_no},
                  {'Title':'Type.SIM','Sma':':','Keterangan':data.result.data[0].sim_tipe},
                  {'Title':'Berlaku','Sma':':','Keterangan':data.result.data[0].sim_tglberlaku},
                  {'Title':'Nama','Sma':':','Keterangan':data.result.data[0].nama},
                  {'Title':'Tempat','Sma':':','Keterangan':data.result.data[0].lahir_tempat},
                  {'Title':'Tgl.Lahir','Sma':':','Keterangan':data.result.data[0].lahir_tgl},
                  {'Title':'Tinggi','Sma':':','Keterangan':data.result.data[0].tinggi},
                  {'Title':'Pekerjaan','Sma':':','Keterangan':data.result.data[0].pekerjaan},
                  {'Title':'Alamat','Sma':':','Keterangan':data.result.data[0].alamat},
                ];
                this.rows_riwayatsim = [
                  {'Tanggal':'12-12-2018 11:02:08','Waktu':'07:02:08','Pelangaran':'Tidak Pakai Helem'},
                  {'Tanggal':'12-12-2017 01:02:08','Waktu':'07:02:08','Pelangaran':'Tidak ada STNK'},
                  {'Tanggal':'12-12-2016 07:02:08','Waktu':'07:02:08','Pelangaran':'Lampu Depan Mati'},
                ];

              }else{
                this.dataTidakAdaToast();
                document.getElementById("data-sim1").hidden=true;
                document.getElementById("data-sim2").hidden=true;
                document.getElementById("data-sim3").hidden=true;
              }
          },
          (err) => {
            this.koneksiMasalahToast(event);
              console.log("jaringan bermasalah");
          });
        }, 1000);
      }else{
        console.log("input kosong");
        console.log("input kosong");
        let dataValidtoast = this.toastCtrl.create({
          message: 'Data kosong atau data tidak valid.',
          duration: 3000,
          position: 'middle'
        });
        dataValidtoast.onDidDismiss(() => {
          console.log('Dismissed toast');
          document.getElementById("data-sim1").hidden=true;
          document.getElementById("data-sim2").hidden=true;
          document.getElementById("data-sim3").hidden=true;
        });
        dataValidtoast.present();
      }
  }

  public cari_barcode(event:any){
    // console.log("cari barcode=",event);
    var paramCari;
    paramCari={
      "sim_no": event,
      //"sim_no": "785876576",
      // "nama": "Anjar Dp",
      // "lahir_tgl": "2018-11-21",
    };

    //Prosess Pencarian Data.
    if (event!=''){

        document.getElementById("data-sim1").hidden=true;
        document.getElementById("data-sim2").hidden=true;
        document.getElementById("data-sim3").hidden=true;

        this.spinnerSim = this.loadingCtrl.create({
          spinner:'bubbles',
          content: 'Persiapan data, Silakan Tunggu...'
        });
        this.spinnerSim.present();

        setTimeout(() => {
          this.rest.postData('sim',paramCari).then((data:any)=>{
            console.log("cari barcode",data);
            if (data.result.total==1){

              document.getElementById("data-sim1").hidden=false;
              document.getElementById("data-sim2").hidden=false;
              document.getElementById("data-sim3").hidden=false;

              this.spinnerSim.dismiss();

              var pathImg=data.result.path;
              var nmImg =data.result.data[0].gambar;
              this.image_datasim=pathImg + nmImg;
              this.rows_datasim = [
                {'Title':'No.SIM','Sma':':','Keterangan':data[0].result.data[0].sim_no},
                {'Title':'Type.SIM','Sma':':','Keterangan':data[0].result.data[0].sim_tipe},
                {'Title':'Berlaku','Sma':':','Keterangan':data[0].result.data[0].sim_tglberlaku},
                {'Title':'Nama','Sma':':','Keterangan':data[0].result.data[0].nama},
                {'Title':'Tempat','Sma':':','Keterangan':data[0].result.data[0].lahir_tempat},
                {'Title':'Tgl.Lahir','Sma':':','Keterangan':data[0].result.data[0].lahir_tgl},
                {'Title':'Tinggi','Sma':':','Keterangan':data[0].result.data[0].tinggi},
                {'Title':'Pekerjaan','Sma':':','Keterangan':data[0].result.data[0].pekerjaan},
                {'Title':'Alamat','Sma':':','Keterangan':data[0].result.data[0].alamat},
              ];
              this.rows_riwayatsim = [
                {'Tanggal':'12-12-2018 11:02:08','Waktu':'07:02:08','Pelangaran':'Tidak Pakai Helem'},
                {'Tanggal':'12-12-2017 01:02:08','Waktu':'07:02:08','Pelangaran':'Tidak ada STNK'},
                {'Tanggal':'12-12-2016 07:02:08','Waktu':'07:02:08','Pelangaran':'Lampu Depan Mati'},
              ];

            }else{

              this.dataTidakAdaToast();
              document.getElementById("data-sim1").hidden=true;
              document.getElementById("data-sim2").hidden=true;
              document.getElementById("data-sim3").hidden=true;
            }
          },
          (err) => {
            this.spinnerSim.dismiss();
            this.koneksiMasalahToast(event);
              console.log("jaringan bermasalah");
          });
        }, 1000);
      }else{
        // this.spinnerSim.dismiss();
        console.log("input kosong");
        let dataValidtoast = this.toastCtrl.create({
          message: 'Data kosong atau data tidak valid.',
          duration: 3000,
          position: 'middle'
        });
        dataValidtoast.onDidDismiss(() => {
          console.log('Dismissed toast');
          document.getElementById("data-sim1").hidden=true;
          document.getElementById("data-sim2").hidden=true;
          document.getElementById("data-sim3").hidden=true;
        });
        dataValidtoast.present();
      }
  }

  koneksiMasalahToast(sim_no:any) {
    let toast = this.toastCtrl.create({
      message: 'Jaringan tidak terpasang, atau server tidak merespon.',
      duration: 3000,
      position: 'middle'
    });
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
      // var filterDataOfline=[];
      // this.rows_datasim=[oflineDataSim[0].result.data];
      let swichtoast = this.toastCtrl.create({
        message: 'Cari Data SIM Offline.',
        duration: 3000,
        position: 'middle'
      });
      swichtoast.onDidDismiss(() => {
        console.log('Ofline Data');
        //Filter Data Ofline
        var filterData=[];
        var rsltDataOfline=oflineDataSim[0].result.data;
        filterData.push(rsltDataOfline.filter(function(arfiObj){
            return arfiObj.sim_no==sim_no;
          })
        );
        if (filterData[0].length>0){
          this.rows_datasim = [
            {'Title':'No.SIM','Sma':':','Keterangan':filterData[0][0].sim_no},
            {'Title':'Type.SIM','Sma':':','Keterangan':filterData[0][0].sim_tipe},
            {'Title':'Berlaku','Sma':':','Keterangan':filterData[0][0].sim_tglberlaku},
            {'Title':'Nama','Sma':':','Keterangan':filterData[0][0].nama},
            {'Title':'Tempat','Sma':':','Keterangan':filterData[0][0].lahir_tempat},
            {'Title':'Tgl.Lahir','Sma':':','Keterangan':filterData[0][0].lahir_tgl},
            {'Title':'Tinggi','Sma':':','Keterangan':filterData[0][0].tinggi},
            {'Title':'Pekerjaan','Sma':':','Keterangan':filterData[0][0].pekerjaan},
            {'Title':'Alamat','Sma':':','Keterangan':filterData[0][0].alamat},
          ];
          document.getElementById("data-sim1").hidden=false;
          document.getElementById("data-sim2").hidden=false;
          document.getElementById("data-sim3").hidden=false;
        }else{

          //Data Ofline Tidak ditemukan
          let tidakDitemukantoast = this.toastCtrl.create({
            message: 'Cari Data SIM Offline, tidak ditemukan.',
            duration: 3000,
            position: 'middle'
          });
          tidakDitemukantoast.onDidDismiss(() => {
            document.getElementById("data-sim1").hidden=true;
            document.getElementById("data-sim2").hidden=true;
            document.getElementById("data-sim3").hidden=true;
            // this.rows_datasim = [{}];
            // [
            //   {'Title':'No.SIM','Sma':':','Keterangan':''},
            //   {'Title':'Type.SIM','Sma':':','Keterangan':''},
            //   {'Title':'Berlaku','Sma':':','Keterangan':''},
            //   {'Title':'No.SIM','Sma':':','Keterangan':''},
            //   {'Title':'Nama','Sma':':','Keterangan':''},
            //   {'Title':'Tempat','Sma':':','Keterangan':''},
            //   {'Title':'Tgl.Lahir','Sma':':','Keterangan':''},
            //   {'Title':'Tinggi','Sma':':','Keterangan':''},
            //   {'Title':'Pekerjaan','Sma':':','Keterangan':''},
            //   {'Title':'Alamat','Sma':':','Keterangan':''},
            // ];
          });
          tidakDitemukantoast.present();
        }
        // this.rows_datasim = [
        //   {'Title':'No.SIM','Sma':':','Keterangan':oflineDataSim[0].result.data[0].sim_no},
        //   {'Title':'Type.SIM','Sma':':','Keterangan':oflineDataSim[0].result.data[0].sim_tipe},
        //   {'Title':'Berlaku','Sma':':','Keterangan':oflineDataSim[0].result.data[0].sim_tglberlaku},
        //   {'Title':'Nama','Sma':':','Keterangan':oflineDataSim[0].result.data[0].nama},
        //   {'Title':'Tempat','Sma':':','Keterangan':oflineDataSim[0].result.data[0].lahir_tempat},
        //   {'Title':'Tgl.Lahir','Sma':':','Keterangan':oflineDataSim[0].result.data[0].lahir_tgl},
        //   {'Title':'Tinggi','Sma':':','Keterangan':oflineDataSim[0].result.data[0].tinggi},
        //   {'Title':'Pekerjaan','Sma':':','Keterangan':oflineDataSim[0].result.data[0].pekerjaan},
        //   {'Title':'Alamat','Sma':':','Keterangan':oflineDataSim[0].result.data[0].alamat},
        // ];
      });
      swichtoast.present();
    });
    toast.present();
  }

  dataTidakAdaToast() {
    let toast = this.toastCtrl.create({
      message: 'Data SIM tidak ditemukan.',
      duration: 3000,
      position: 'middle'
    });
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
      this.spinnerSim.dismiss();
    });
    toast.present();
  }

  public cari_namatgl(){
    let toast = this.toastCtrl.create({
      message: 'Koneksi tidak stabil, coba beberapa saat kembali.',
      duration: 3000,
      position: 'middle'
    });
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
    toast.present();
  }

  public submitCari(){
    console.log("button submit=",cariId);
    this.cari1(cariId);
  }

  public mergeSearch(event:any){
    cariId=event;
    if (brcodeStt==1){
      this.cari1(cariId);
      brcodeStt=0;
    }
    console.log("merge search=",cariId);
  }

  public pushTombolBarcode(){
    this.platform.ready().then(() => {
      if (this.platform._platforms[0] == 'cordova') {
        this.barcodeScanner.scan({
          preferFrontCamera: false, // iOS and Android
          showFlipCameraButton: false, // iOS and Android
          showTorchButton: true, // iOS and Android
          torchOn: false, // Android, launch with the torch switched on (if available)
          resultDisplayDuration: 500,
          formats: 'QR_CODE,PDF_417,EAN_8,EAN_13'
        }).then(barcodeData => {
          console.log('Barcode data', barcodeData);
          // this.nilaiVarcode=barcodeData.text;
          // document.getElementById("nilai-cari").innerHTML=barcodeData.text;
          this.searchbar.value='785876576';
          brcodeStt=1;
       }).catch(err => {
           console.log('Error', err);
           brcodeStt=0;
       });
      }else{
        let platformtoast = this.toastCtrl.create({
          message: 'Digunakan pada perangkat Android/ios.',
          duration: 3000,
          position: 'middle'
        });
        platformtoast.onDidDismiss(() => {
          console.log('Dismissed toast');
        });
        platformtoast.present();
      }
    });
  }

}
