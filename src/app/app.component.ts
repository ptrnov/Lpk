import { Component, ViewChild } from '@angular/core';
import { Nav, Platform,Events } from 'ionic-angular';
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
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public keyboard: Keyboard,
    public database:DatabaseProvider,
    public events: Events
  ) {
    this.initializeApp();

    this.platform.ready().then(() => {
      this.database.initProvider();
    });

    this.appMenuItems=[];
    this.appMenuItems = [
      {id:'side-button[0]', title: 'Home', component: HomePage, icon: 'ios-checkmark-circle-outline', color:'light'},
      {id:'side-button[1]', title: 'Pengecekan SIM', component: SimPage, icon: 'ios-checkmark-circle-outline', color:'light'},
      {id:'side-button[2]', title: 'Pengecekan Kendaraan', component: NokendaraanPage, icon: 'ios-checkmark-circle-outline', color:'light'},
      {id:'side-button[3]', title: 'Laporan Kecelakaan', component: FormkecelakaanPage, icon: 'ios-checkmark-circle-outline', color:'light'},
      {id:'side-button[4]', title: 'Laporan Tilang', component: FormkecelakaanPage, icon: 'ios-checkmark-circle-outline', color:'light'},
    ];

    this.events.subscribe('profileLogin', (data:any) =>{
        // console.log("profile login=",data);
        this.profileData=data;
        if(data[0]['username']=='administrator'){
          this.appMenuItems=[];
          this.appMenuItems = [
            {id:'side-button[0]', title: 'Home', component: HomePage, icon: 'ios-checkmark-circle-outline', color:'light'},
            {id:'side-button[1]', title: 'Pengecekan SIM', component: SimPage, icon: 'ios-checkmark-circle-outline', color:'light'},
            {id:'side-button[2]', title: 'Pengecekan Kendaraan', component: NokendaraanPage, icon: 'ios-checkmark-circle-outline', color:'light'},
            {id:'side-button[3]', title: 'Laporan Kecelakaan', component: FormkecelakaanPage, icon: 'ios-checkmark-circle-outline', color:'light'},
            {id:'side-button[4]', title: 'Laporan Tilang', component: FormkecelakaanPage, icon: 'ios-checkmark-circle-outline', color:'light'},
            {id:'side-button[5]', title: 'Tambah Pengguna', component: SignupPage, icon: 'ios-checkmark-circle-outline', color:'light'}
          ];
          // this.appMenuItems.push({id:'side-button[3]', title: 'Tambah Pengguna', component: SimPage, icon: 'ios-checkmark-circle-outline', color:'light'});
        }else{
          this.appMenuItems=[];
          this.appMenuItems = [
            {id:'side-button[0]', title: 'Home', component: HomePage, icon: 'ios-checkmark-circle-outline', color:'light'},
            {id:'side-button[1]', title: 'Pengecekan SIM', component: SimPage, icon: 'ios-checkmark-circle-outline', color:'light'},
            {id:'side-button[2]', title: 'Pengecekan Kendaraan', component: NokendaraanPage, icon: 'ios-checkmark-circle-outline', color:'light'},
            {id:'side-button[3]', title: 'Laporan Kecelakaan', component: FormkecelakaanPage, icon: 'ios-checkmark-circle-outline', color:'light'},
            {id:'side-button[4]', title: 'Laporan Tilang', component: FormkecelakaanPage, icon: 'ios-checkmark-circle-outline', color:'light'},
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
