import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { getTimelinePoldaPic,getTimelineIcon} from "./data";
/**
 * Generated class for the BeritapoldaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-beritapolda',
  templateUrl: 'beritapolda.html',
})
export class BeritapoldaPage {

  timelinePic;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.timelinePic=getTimelinePoldaPic;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BeritapoldaPage');
  }

}
