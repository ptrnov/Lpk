import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators,ValidatorFn,AbstractControl } from '@angular/forms';
import { DatabaseProvider } from '../../providers/database/database';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  todo   : FormGroup;

  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      private formBuilder : FormBuilder,
      private database: DatabaseProvider,
  ){
    this.todo  = this.formBuilder.group({
      id: ['',[Validators.required,]],
      username: ['',[Validators.required,]],
      password: ['',[Validators.required,]] ,
      nama: ['',[Validators.required,]],
      jabatan: ['',[Validators.required,]],
      polda: ['',[Validators.required,]],
      polwil: ['',[Validators.required,]]
      // psw: ['',[
      //             Validators.required,
      //             Validators.minLength(10),
      //            // Validators.pattern('^[0-9]+$'), //numerik,
      //            ,this.equalto()
      //           ]
      //       ]
      // psw: [' ',Validators.compose([
      //             Validators.required,Validators.minLength[10]
      //           ])
      //      ]
    });
  }

  tambahUser(data){
    let qry="INSERT INTO user (id,username,password,nama,jabatan,polda,polwil)  VALUES (?,?,?,?,?,?,?)";
    this.database.insertData(qry,[data['id'],data['username'],data['password'],data['nama'],data['jabatan'],data['polda'],data['polwil']]);
    // .then((msq)=>{
    //   //alert('message' + msq);
    //   console.log(msq);
    // });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

}
