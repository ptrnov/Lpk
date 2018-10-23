import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Keyboard } from '@ionic-native/keyboard';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { NokendaraanPage } from '../pages/nokendaraan/nokendaraan';
import { SimPage } from '../pages/sim/sim';

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
  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public keyboard: Keyboard
  ) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    // this.pages = [
    //   { title: 'Form', component: HomePage },
    //   { title: 'List', component: ListPage }
    // ];
    this.appMenuItems = [
      {id:'side-button[0]', title: 'Laporan Kecelakaan - Laporan Awal', component: HomePage, icon: 'ios-checkmark-circle-outline', color:'light'},
      {id:'side-button[1]', title: 'Pengecekan Nomor Kendaraan', component: NokendaraanPage, icon: 'ios-checkmark-circle-outline', color:'light'},
      {id:'side-button[2]', title: 'Pengecekan SIM', component: SimPage, icon: 'ios-checkmark-circle-outline', color:'light'},
    ];

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
