import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SelectSearchableComponent  } from 'ionic-select-searchable';

class Port {
  public id: number;
  public name: string;
}
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
ports: Port[];
port: Port;
  constructor(public navCtrl: NavController) {
    this.ports = [
      { id: 1, name: 'Piter' },
      { id: 2, name: 'Novian' },
      { id: 3, name: 'ptrnov' }
    ];
  }

  portChange(event: {
    component: SelectSearchableComponent,
    value: any
  }) {
    console.log('port:', event);
  }

}
