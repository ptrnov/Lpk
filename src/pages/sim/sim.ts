import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  constructor(
      public navCtrl: NavController,
      public navParams: NavParams
  ){
    this.columns_datasim=[
      { name: 'Title',prop: 'Title', width: 100 },
      { name: 'Sma',prop: 'Sma', width: 5 },
      { name: 'Keterangan',prop: 'Keterangan' },
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
      { name: 'Waktu', prop: 'Waktu', width: 40 },
      { name: 'Pelangaran',prop: 'Pelangaran'}
    ];

    this.rows_riwayatsim = [
      {'Tanggal':'12-12-2018','Waktu':'07:02:08','Pelangaran':'Tidak Pakai Helem'},
      {'Tanggal':'12-12-2018','Waktu':'07:02:08','Pelangaran':'Tidak ada STNK'},
      {'Tanggal':'12-12-2018','Waktu':'07:02:08','Pelangaran':'Lampu Depan Mati'},
    ];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SimPage');
  }

}
