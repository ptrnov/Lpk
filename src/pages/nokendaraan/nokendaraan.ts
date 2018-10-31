import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

export interface rsltData {
  prop: 'COMPANY';
  name: 'NAME';
  name1: 'COMPANY';
}

@IonicPage()
@Component({
  selector: 'page-nokendaraan',
  templateUrl: 'nokendaraan.html',
})
export class NokendaraanPage {

  private rsltData:any;
  public columns : any;
  public rows : any;
  public sorts : any;
  public ambilDataRrows : any;
  public rows_datakendaraan: any;
  public columns_datakendaraan: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.columns_datakendaraan=[
      { prop: 'Title' },
      { prop: 'Keterangan' },
    ]
    this.rows_datakendaraan = [
      {'Title':'No.kendaraan','Keterangan':'12312321'},
    ];

    this.columns = [
      { prop: 'Tanggal' },
      { prop: 'Waktu' },
      { prop: 'Pelangaran' }
    ];

    this.rows = [
      {'Tanggal':'12-12-2018','Waktu':'07:02:08','Pelangaran':'Menerobos lampu merah'},
      {'Tanggal':'12-12-2018','Waktu':'07:02:08','Pelangaran':'tabrak lari'},
      {'Tanggal':'12-12-2018','Waktu':'07:02:08','Pelangaran':'tabrak lari'},
      {'Tanggal':'12-12-2018','Waktu':'07:02:08','Pelangaran':'tabrak lari'},
      {'Tanggal':'12-12-2018','Waktu':'07:02:08','Pelangaran':'tabrak lari'},
      {'Tanggal':'12-12-2018','Waktu':'07:02:08','Pelangaran':'tabrak lari'},
      {'Tanggal':'12-12-2018','Waktu':'07:02:08','Pelangaran':'tabrak lari'},
      {'Tanggal':'12-12-2018','Waktu':'07:02:08','Pelangaran':'tabrak lari'},
    ];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NokendaraanPage');
  }

}
