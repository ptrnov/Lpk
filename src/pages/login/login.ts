import {Component} from "@angular/core";
import {NavController, AlertController, ToastController, MenuController,Config,Events} from "ionic-angular";
import {HomePage} from "../home/home";
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  public responseData : any;
  userData = {"username": "","password": "", "name": "","email": ""};
  constructor(
      public nav: NavController,
      public forgotCtrl: AlertController,
      public menu: MenuController,
      public toastCtrl: ToastController,
      // private database: DatabaseProvider,
      // private dashboarAll: DashboardAllProvider,
      public config:Config,
      public events: Events
  ){
    this.menu.swipeEnable(false);
    // this.dashboarAll.initData();
    // .getAllPrj();
  }
  ngOnInit() {
    // this.dashboarAll.getAllPrj();
    // this.dashboarAll.getB2SPrj();
    // this.dashboarAll.getCorePrj();
    // this.dashboarAll.getMcpPrj()
    // this.dashboarAll.getSpPrj();
    // this.dashboarAll.getChartData();
   //  this.dashboarAll.getSetting();
    // this.dashboarAll.getMapData();
   // this.dashboarAll.getMapB2s();
    // this.dashboarAll.getMapCore();
    // this.dashboarAll.getMapMcp();
    // this.dashboarAll.getMapSp();
    // this.dashboarAll.getUser();
    // this.dashboarAll.getMitraList();
  }
  // go to register page
  register() {
   // this.nav.setRoot(RegisterPage);
  }

  // login and go to home page
  login() {
    this.nav.setRoot(HomePage);
    // let toastSukses = this.toastCtrl.create({
    //   message: 'wait a moment',
    //   duration: 3000,
    //   position: 'middle'
    // });

    // this.dashboarAll.postData(this.userData.username +"/"+ this.userData.password).then((result) => {
    //   this.responseData = result;
    //   if(this.responseData.login){
    //     console.log(this.responseData);
    //     if(this.responseData.login[0]['STATUS']!=false){
    //         toastSukses.present();
    //         toastSukses.onDidDismiss(() => {
    //           localStorage.setItem('profile', JSON.stringify(this.responseData));
    //           this.config.set('real_name',this.responseData.login[0]['real_name']);
    //           this.config.set('user_group',this.responseData.login[0]['user_group']);
    //           this.events.publish('profileLogin',this.responseData);
    //           this.nav.setRoot(HomePage);
    //         });
    //     }else{
    //       this.salahUserPasswordToast();
    //     }
    //   }
    // }, (err) => {
    //   this.koneksiMasalahToast();
    //     console.log("jaringan bermasalah");
    // });
    // this.nav.setRoot(HomePage);
  }

  salahUserPasswordToast() {
    let toast = this.toastCtrl.create({
      message: 'User or Password incorrect.',
      duration: 3000,
      position: 'middle'
    });
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
    toast.present();
  }

  koneksiMasalahToast() {
    let toast = this.toastCtrl.create({
      message: 'Network is not connected. Make sure your network is installed',
      duration: 3000,
      position: 'middle'
    });
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
    toast.present();
  }

  forgotPass() {
    let forgot = this.forgotCtrl.create({
      title: 'Forgot Password?',
      message: "Enter you email address to send a reset link password.",
      inputs: [
        {
          name: 'email',
          placeholder: 'Email',
          type: 'email'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Send',
          handler: data => {
            console.log('Send clicked');
            let toast = this.toastCtrl.create({
              message: 'Email was sended successfully',
              duration: 3000,
              position: 'top',
              cssClass: 'dark-trans',
              closeButtonText: 'OK',
              showCloseButton: true
            });
            toast.present();
          }
        }
      ]
    });
    forgot.present();
  }

}
