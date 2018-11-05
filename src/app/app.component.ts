import { Component, ViewChild } from '@angular/core';
import { App,Nav, Platform,Events,AlertController  } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Keyboard } from '@ionic-native/keyboard';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { NokendaraanPage } from '../pages/nokendaraan/nokendaraan';
import { SimPage } from '../pages/sim/sim';
import { SignupPage } from '../pages/signup/signup';
import { FormkecelakaanPage } from '../pages/formkecelakaan/formkecelakaan';
import { TilangPage } from '../pages/tilang/tilang';
import { DatabaseProvider } from '../providers/database/database';

export interface MenuItem {
  id:string;
  title: string;
  component: any;
  icon: string;
  color:any
}
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  showSplash = true;
  rootPage: any = LoginPage;
  activePage: any;

  pages: Array<{title: string, component: any}>;
  appMenuItems: Array<MenuItem>;
  profileData:any;

  constructor(
    public platform: Platform,
    public app:App,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public keyboard: Keyboard,
    public database:DatabaseProvider,
    public events: Events,
    public alertCtrl:AlertController
  ) {

    this.initializeApp();

    this.platform.ready().then(() => {
      this.database.initProvider();
    });

    this.appMenuItems=[];
    this.appMenuItems = [
      // {id:'side-button[0]', title: 'Menu', component: HomePage, icon: 'ios-checkmark-circle-outline', color:'light'},
      // {id:'side-button[1]', title: 'Pengecekan SIM', component: SimPage, icon: 'ios-checkmark-circle-outline', color:'light'},
      // {id:'side-button[2]', title: 'Pengecekan Kendaraan', component: NokendaraanPage, icon: 'ios-checkmark-circle-outline', color:'light'},
      // {id:'side-button[3]', title: 'Laporan Kecelakaan', component: FormkecelakaanPage, icon: 'ios-checkmark-circle-outline', color:'light'},
      // {id:'side-button[4]', title: 'Laporan Tilang', component: TilangPage, icon: 'ios-checkmark-circle-outline', color:'light'},
      {id:'side-button[0]', title: 'Menu', component: HomePage, icon: 'assets/imgs/home.png', color:'light'},
      {id:'side-button[1]', title: 'Pengecekan SIM', component: SimPage, icon: 'assets/imgs/sim.png', color:'light'},
      {id:'side-button[2]', title: 'Pengecekan Kendaraan', component: NokendaraanPage, icon: 'assets/imgs/pengecekan_kendaraan1.png', color:'light'},
      {id:'side-button[3]', title: 'Laporan Kecelakaan', component: FormkecelakaanPage, icon: 'assets/imgs/kecelakaan3.png', color:'light'},
      {id:'side-button[4]', title: 'Laporan Tilang', component: TilangPage, icon: 'assets/imgs/tilang.png', color:'light'},
    ];

    this.events.subscribe('profileLogin', (data:any) =>{
        // console.log("profile login=",data);
        this.profileData=data;
        if(data[0]['username']=='administrator'){
          this.appMenuItems=[];
          this.appMenuItems = [
            {id:'side-button[0]', title: 'Menu', component: HomePage, icon: 'assets/imgs/home.png', color:'light'},
            {id:'side-button[1]', title: 'Pengecekan SIM', component: SimPage, icon: 'assets/imgs/sim.png', color:'light'},
            {id:'side-button[2]', title: 'Pengecekan Kendaraan', component: NokendaraanPage, icon: 'assets/imgs/pengecekan_kendaraan1.png', color:'light'},
            {id:'side-button[3]', title: 'Laporan Kecelakaan', component: FormkecelakaanPage, icon: 'assets/imgs/kecelakaan3.png', color:'light'},
            {id:'side-button[4]', title: 'Laporan Tilang', component: TilangPage, icon: 'assets/imgs/tilang.png', color:'light'},
            // {id:'side-button[5]', title: 'Tambah Pengguna', component: SignupPage, icon: 'assets/imgs/sim.png', color:'light'}
          ];
          // this.appMenuItems.push({id:'side-button[3]', title: 'Tambah Pengguna', component: SimPage, icon: 'assets/imgs/sim.png', color:'light'});
        }else{
          this.appMenuItems=[];
          this.appMenuItems = [
            {id:'side-button[0]', title: 'Menu', component: HomePage, icon: 'assets/imgs/home.png', color:'light'},
            {id:'side-button[1]', title: 'Pengecekan SIM', component: SimPage, icon: 'assets/imgs/sim.png', color:'light'},
            {id:'side-button[2]', title: 'Pengecekan Kendaraan', component: NokendaraanPage, icon: 'assets/imgs/pengecekan_kendaraan1.png', color:'light'},
            {id:'side-button[3]', title: 'Laporan Kecelakaan', component: FormkecelakaanPage, icon: 'assets/imgs/kecelakaan3.png', color:'light'},
            {id:'side-button[4]', title: 'Laporan Tilang', component: TilangPage, icon: 'assets/imgs/tilang.png', color:'light'},
          ];
        }

        // setTimeout(() => {
        //   this.database.setAdministrator();
        // },1000);
    });

    // used for an example of ngFor and navigation
    // this.pages = [
    //   { title: 'Form', component: HomePage },
    //   { title: 'List', component: ListPage }
    // ];





  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.statusBar.overlaysWebView(false);
      this.splashScreen.hide();
      // this.keyboard.disableScroll(true);
      this.platform.registerBackButtonAction(() => {
        // Catches the active view
        let nav = this.app.getActiveNavs()[0];
        let activeView = nav.getActive();
        // Checks if can go back before show up the alert
        if(activeView.name === 'HomePage') {
            if (nav.canGoBack()){
                // nav.pop();
                console.log("nav=ok");
            } else {
                const alert = this.alertCtrl.create({
                    title: 'Fechar o App',
                    message: 'Você tem certeza?',
                    buttons: [{
                        text: 'Cancelar',
                        role: 'cancel',
                        handler: () => {
                          this.nav.setRoot('HomePage');
                          console.log('** Saída do App Cancelada! **');
                        }
                    },{
                        text: 'Fechar o App',
                        handler: () => {
                          this.logout();
                          this.platform.exitApp();
                        }
                    }]
                });
                alert.present();
            }
        }
    });



    });
  }


  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
    page.color="light";
    for (let p of this.appMenuItems) {

        if(p.title==page.title)
        {
          p.color='sideButton';
        }
        else
        {
          p.color='light';
        }

        }
  }

  public checkActivePage(page): boolean{
    return page === this.activePage;
  }

  logout() {
    this.nav.setRoot(LoginPage);
  }
}
