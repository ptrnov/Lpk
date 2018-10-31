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
      { prop: 'Title' },
      { prop: 'Keterangan' },
    ]
    this.rows_datasim = [
      {'Title':'No.kendaraan','Keterangan':'12312321'},
    ];

    this.columns_riwayatsim = [
      { prop: 'Tanggal' },
      { prop: 'Waktu' },
      { prop: 'Pelangaran' }
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
