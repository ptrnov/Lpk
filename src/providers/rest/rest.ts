// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions } from "@angular/http";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/interval';
import 'rxjs/add/observable/timer';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RestProvider {
  //private url: string ="http://polantas.cudo.co.id:8000";
  private url: string ="http://korlantas.api.cudo.co.id";
  // private url: string ="http://192.168.100.101:8000";
  constructor(
    private http: Http
  ){
    // var headers = new Headers();
    // headers.append("Accept", 'application/json');
    // headers.append('Content-Type', 'application/json' );
    // headers.append('api-token', 'zSWHVwcT45LeBAvONIdx1pjNDHyDlK7i' );
    // const requestOptions = new RequestOptions({ headers: headers });

    // let postData = {
    //         "name": "Customer004",
    //         "email": "customer004@email.com",
    //         "tel": "0000252525"
    // }
  }

  /**
   * https://www.techiediaries.com/ionic-http-post/
  */
  postData(aktivituCtr,postData) {
  // postData(credentials,paramBody) {
    return new Promise((resolve, reject) => {
      var headers = new Headers();
      //  headers.append('Content-Type', 'application/x-www-form-urlencoded');
      //  headers.append('Accept', 'application/json');
      // headers.append("Accept", 'application/json');
      // headers.append('Content-Type', 'application/json' );
      headers.append('api-token', 'zSWHVwcT45LeBAvONIdx1pjNDHyDlK7i' );
      const requestOptions = new RequestOptions({ headers: headers });
      // var aktivituCtr="kendaraan";
      // let postData = {
      //         "no_polisi": "B",
      //         // "email": "customer004@email.com",
      //         // "tel": "0000252525"
      // }
      let rslt=this.http.post(this.url + "/"+ aktivituCtr, postData, requestOptions).map(res => res.json());

      // this.http.post(this.url + "/"+ aktivituCtr, postData, requestOptions)
      rslt.timeout(1000);
      rslt.subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
      });
  }

  getDatax(activity,credentials) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      // this.http.get("http://192.168.100.3/" + "Mobile_Dashboard/login/"+ credentials)
      this.http.get(this.url + activity + credentials)
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });

  }

  postApiMap(activity,credentials) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      // this.http.get("http://192.168.100.3/" + "Mobile_Dashboard/login/"+ credentials)
      let rslt=this.http.get(this.url + activity + credentials).map(res => res.json());
      rslt.subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
    });
  }
}
