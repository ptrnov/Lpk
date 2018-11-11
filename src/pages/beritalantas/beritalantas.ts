import { Component } from '@angular/core';
import { ModalController,IonicPage, NavController, NavParams } from 'ionic-angular';
import { getTimelinePic,getTimelineIcon} from "./data";
import { BeritalantasaddPage} from '../../pages/beritalantasadd/beritalantasadd';


@IonicPage()
@Component({
  selector: 'page-beritalantas',
  templateUrl: 'beritalantas.html',
})
export class BeritalantasPage {

  timelinePic;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
  ){
    this.timelinePic=getTimelinePic;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BeritalantasPage');
  }

  public tambahberita(){
    console.log("berita lantar");
      //var data = { message : 'hello world' };
      var ModalAdduser = this.modalCtrl.create(BeritalantasaddPage);
      ModalAdduser.onDidDismiss(() => {
        // this.ionViewDidLoad();
      });
      ModalAdduser.present();
  }

}
