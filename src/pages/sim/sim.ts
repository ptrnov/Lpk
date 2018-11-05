import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
// import QRCode from 'qrcode';
@IonicPage()
@Component({
  selector: 'page-sim',
  templateUrl: 'sim.html',
})
export class SimPage {

  public columns_datasim : any;
  public rows_datasim : any;
  public columns_riwayatsim: any;
  public rows_riwayatsim: any;
  public encodeData : string=window.localStorage.getItem("auth_key");;
  public encodedData : {} ;

  qrData = null;
  createdCode = null;
  scannedCode = null;

  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      private barcodeScanner: BarcodeScanner
  ){
    // this.barcodeScanner.encode('QR_CODE','1348180502933');
    // this.barcodeScanner.encode(this.barcodeScanner.Encode.TEXT_TYPE,'1348180502933').then((encodedData) => {
    //     console.log(encodedData);
    //     this.encodedData = encodedData;

    // }, (err) => {
    //     console.log("Error occured : " + err);
    // });

    this.columns_datasim=[
      { name: 'Title',prop: 'Title', width: 100, align:1 },
      { name: 'Sma',prop: 'Sma', width: 5 },
      { name: 'Keterangan',prop: 'Keterangan' }
    ]
    this.rows_datasim = [
      {'Title':'No.SIM','Sma':':','Keterangan':'1348180502933'},
      {'Title':'Type.SIM','Sma':':','Keterangan':'A'},
      {'Title':'Berlaku','Sma':':','Keterangan':'14-11-2023'},
      {'Title':'No.SIM','Sma':':','Keterangan':'1348180502933'},
      {'Title':'Nama','Sma':':','Keterangan':'PITER NOVIAN'},
      {'Title':'Tempat','Sma':':','Keterangan':'PALEMBANG'},
      {'Title':'Tgl.Lahir','Sma':':','Keterangan':'14-11-1981'},
      {'Title':'Tinggi','Sma':':','Keterangan':'170 cm'},
      {'Title':'Pekerjaan','Sma':':','Keterangan':'SWASTA'},
      {'Title':'Alamat','Sma':':','Keterangan':'Duta Bintaro, Ubud 1 '},
    ];

    this.columns_riwayatsim = [
      { name: 'Tanggal',prop: 'Tanggal', width: 40 },
      { name: 'Pelangaran',prop: 'Pelangaran'}
    ];

    this.rows_riwayatsim = [
      {'Tanggal':'12-12-2018 11:02:08','Waktu':'07:02:08','Pelangaran':'Tidak Pakai Helem'},
      {'Tanggal':'12-12-2017 01:02:08','Waktu':'07:02:08','Pelangaran':'Tidak ada STNK'},
      {'Tanggal':'12-12-2016 07:02:08','Waktu':'07:02:08','Pelangaran':'Lampu Depan Mati'},
    ];
  }

  createCode() {
    this.createdCode = '123';//this.qrData;
  }

  ionViewDidLoad() {
    setTimeout(() => {
      document.getElementById("cari_namasim").hidden=true;
    }, 100);
  }

  public radioklik(event:Event){
    var rslt:any;
    rslt=event;
    console.log("radio=",event);
    if (rslt=="nosim"){
      document.getElementById("cari_nosim").hidden=false;
      document.getElementById("cari_namasim").hidden=true;
    }else if(rslt=="namasim"){
      document.getElementById("cari_nosim").hidden=true;
      document.getElementById("cari_namasim").hidden=false;
    };
  }

  public cari1(event:Event){
    console.log("cari sim=",event);
  }
  public cari_barcode(event:Event){
    console.log("cari barcode=",event);
  }
}
