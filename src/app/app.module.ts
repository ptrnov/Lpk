import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { SQLite } from '@ionic-native/sqlite';
import {Keyboard} from '@ionic-native/keyboard';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { NokendaraanPage } from '../pages/nokendaraan/nokendaraan';
import { SimPage } from '../pages/sim/sim';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SelectSearchableModule  } from 'ionic-select-searchable';
import { DatabaseProvider } from '../providers/database/database';
import { Camera } from '@ionic-native/camera';
import { DatePicker } from '@ionic-native/date-picker';
import { FormkecelakaanPage } from '../pages/formkecelakaan/formkecelakaan';
import { Base64 } from '@ionic-native/base64';
import { TilangPage } from '../pages/tilang/tilang';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    SignupPage,
    NokendaraanPage,
    SimPage,
    FormkecelakaanPage,
    TilangPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    IonicModule.forRoot(MyApp, {
      scrollPadding: false,
      scrollAssist: true,
      autoFocusAssist: false,
      bulan: 10,
      tahun: 2018,
      real_name:'none',
      user_group:'none'
    }),
    SelectSearchableModule,
    NgxDatatableModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    SignupPage,
    NokendaraanPage,
    SimPage,
    FormkecelakaanPage,
    TilangPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Keyboard,
    SQLite,
    DatabaseProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DatabaseProvider,
    Camera,
    DatePicker,
    Base64
  ]
})
export class AppModule {}
