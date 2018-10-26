import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Events } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators,ValidatorFn,AbstractControl } from '@angular/forms';
import { DatabaseProvider } from '../../providers/database/database';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  todo   : FormGroup;
  selectjabatan;
  selectPolda;
  selectPolwil;


  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      private formBuilder : FormBuilder,
      private database: DatabaseProvider,
      public events: Events
  ){
  this.selectjabatan=this.database.aryJabatan();
  this.selectPolda=this.database.aryPolda();
  this.events.subscribe('publisPolwil', (data:any) =>{
    this.selectPolwil=data;
    console.log("Polwil",data);
  });


    console.log("polwil=",this.database.aryPolwil(1));
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

  public poldaChange(event: Event) {
    console.log("id polda",event);
    // this.selectPolwil=
    this.database.aryPolwil(event);
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
