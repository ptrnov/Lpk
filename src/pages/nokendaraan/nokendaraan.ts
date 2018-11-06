import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController,ToastController,NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
// import QRCode from 'qrcode';
import { oflineDataKendaraan } from "./data";
export interface rsltData {
  prop: 'COMPANY';
  name: 'NAME';
  name1: 'COMPANY';
}
let inputCari;
@IonicPage()
@Component({
  selector: 'page-nokendaraan',
  templateUrl: 'nokendaraan.html',
})
export class NokendaraanPage {

  private rsltData:any;
  public columns : any;
  public rows : any;
  public image_dataKendaraan : any;

  public sorts : any;
  public ambilDataRrows : any;
  public rows_datakendaraan: any;
  public columns_datakendaraan: any;

  private spinnerKen;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public rest:RestProvider,
    public toastCtrl:ToastController,
    public loadingCtrl: LoadingController,
  ) {
    this.columns_datakendaraan=[
      { name: 'Title',prop: 'Title', width: 100 },
      { name: 'Sma',prop: 'Sma', width: 5 },
      { name: 'Keterangan',prop: 'Keterangan' },
    ]
    this.rows_datakendaraan = [
      {'Title':'No.Polisi','Sma':':','Keterangan':'B-1817-NFO'},
      {'Title':'Nama Pemilik','Sma':':','Keterangan':'PITER NOVIAN'},
      {'Title':'Merek/Type','Sma':':','Keterangan':'DAIHATSU'},
      {'Title':'Jenis Mobil','Sma':':','Keterangan':'MINIBUS'},
      {'Title':'Berlaku STNK','Sma':':','Keterangan':'14-11-2023'},
      {'Title':'Berlaku Pajak','Sma':':','Keterangan':'12-12-2018'},
    ];

    this.columns = [
      { name: 'Tanggal',prop: 'Tanggal', width: 40 },
      { name: 'Pelangaran',prop: 'Pelangaran'}
    ];

    // this.rows = [
    //   {'Tanggal':'12-12-2018 07:02:08','Pelangaran':'Menerobos lampu merah'},
    //   {'Tanggal':'12-12-2017 12:02:08','Pelangaran':'tabrak lari'},
    // ];
  }

  ionViewDidLoad() {
    setTimeout(() => {
      document.getElementById("data-kendaraan1").hidden=true;
      document.getElementById("data-kendaraan2").hidden=true;
      document.getElementById("data-kendaraan3").hidden=true;
    }, 100);
  }

  public cari1(event:any){
    console.log("cari sim=",event);
        var paramCari;
    paramCari={
      "no_polisi": event,
      //"sim_no": "785876576",
      // "nama": "Anjar Dp",
      // "lahir_tgl": "2018-11-21",
    };

    //Prosess Pencarian Data.
    if (event!=''){

      document.getElementById("data-kendaraan1").hidden=true;
      document.getElementById("data-kendaraan2").hidden=true;
      document.getElementById("data-kendaraan3").hidden=true;

      this.spinnerKen = this.loadingCtrl.create({
        spinner:'bubbles',
        content: 'Persiapan data, Silakan Tunggu...'
      });
      this.spinnerKen.present();

      setTimeout(() => {
        this.rest.postData('kendaraan',paramCari).then((data:any)=>{
          console.log("cari barcode",data);
            if (data.result.total==1){

              document.getElementById("data-kendaraan1").hidden=false;
              document.getElementById("data-kendaraan2").hidden=false;
              document.getElementById("data-kendaraan3").hidden=false;

              this.spinnerKen.dismiss();
              // var pathImg=data.result.path;
              // var nmImg =data.result.data[0].gambar;
              // this.image_dataKendaraan=pathImg + nmImg;
              this.rows_datakendaraan = [
                {'Title':'No.Polisi','Sma':':','Keterangan':data.result.data[0].no_polisi},
                {'Title':'Nama Pemilik','Sma':':','Keterangan':data.result.data[0].nama_pemilik},
                {'Title':'Alamat Pemilik','Sma':':','Keterangan':data.result.data[0].alamat},
                {'Title':'Merek/Type','Sma':':','Keterangan':data.result.data[0].merk_type},
                {'Title':'Jenis Mobil','Sma':':','Keterangan':data.result.data[0].jenis_model},
                {'Title':'Bahan Bakar','Sma':':','Keterangan':data.result.data[0].bahan_bakar},
                {'Title':'Berlaku STNK','Sma':':','Keterangan':data.result.data[0].berlaku_stnk},
                {'Title':'Berlaku Pajak','Sma':':','Keterangan':data.result.data[0].berlaku_pajak},
                {'Title':'Samsat Provinsi','Sma':':','Keterangan':data.result.data[0].samsat_provinsi},
                {'Title':'No.BPKAB','Sma':':','Keterangan':data.result.data[0].no_bpkb},
                {'Title':'Tgl.Daftar','Sma':':','Keterangan':data.result.data[0].tgl_daftar},
              ];
              this.rows = [
                {'Tanggal':'12-12-2018 07:02:08','Pelangaran':'Menerobos lampu merah'},
                {'Tanggal':'12-12-2017 12:02:08','Pelangaran':'tabrak lari'},
              ];

            }else{
              console.log("jaringan bermasalah");
              // this.dataTidakAdaToast();
              document.getElementById("data-kendaraan1").hidden=true;
              document.getElementById("data-kendaraan2").hidden=true;
              document.getElementById("data-kendaraan3").hidden=true;
            }
        },
        (err) => {
            this.spinnerKen.dismiss();
            this.spinnerKen.onDidDismiss(() => {
              let dataValidtoast = this.toastCtrl.create({
                message: 'Masalah pada jaringan.',
                duration: 3000,
                position: 'middle'
              });
              dataValidtoast.present();
            });

          // this.koneksiMasalahToast(event);
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
        document.getElementById("data-kendaraan1").hidden=true;
        document.getElementById("data-kendaraan2").hidden=true;
        document.getElementById("data-kendaraan3").hidden=true;
      });
      dataValidtoast.present();
    }
  }

  public mergeSearch(event:any){
    inputCari=event;
  }

  public submitCari(){

    this.cari1(inputCari);
  }
}
