import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { getTimelinePic,getTimelineIcon} from "./data";


@IonicPage()
@Component({
  selector: 'page-beritalantas',
  templateUrl: 'beritalantas.html',
})
export class BeritalantasPage {

  timelinePic;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ){
    this.timelinePic=getTimelinePic;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BeritalantasPage');
  }

}
