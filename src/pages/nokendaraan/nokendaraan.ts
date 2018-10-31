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
      { name: 'Waktu', prop: 'Waktu', width: 40 },
      { name: 'Pelangaran',prop: 'Pelangaran'}
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
