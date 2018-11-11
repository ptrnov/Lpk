import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-tilang',
  templateUrl: 'tilang.html',
})
export class TilangPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TilangPage');
  }
  public check(e){
    if(e == 1){
      document.getElementById('bg-form').style.backgroundColor = 'red';
    }else{
      document.getElementById('bg-form').style.backgroundColor = 'blue';
    }
  }

}
