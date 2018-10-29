import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, NavController, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
import { FeedPage } from '../pages/feed/feed';
import { FoundPage } from '../pages/found/found';
import { LostPage } from '../pages/lost/lost';
import { AboutAppPage } from '../pages/about-app/about-app';
import { ListchatPage } from '../pages/listchat/listchat';
import { SettingsPage } from '../pages/settings/settings';
import { SearchPage } from '../pages/search/search';
import { LogoutPage } from '../pages/logout/logout';
import { UserService } from '../providers/user-service/user-service';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;

  @ViewChild(Nav) nav:Nav;
  pages: Array<{title: string, component: any, icon: string}>;

  Usercontent=[];

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private alert: AlertController,private uServ:UserService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });



    this.pages = [
      { title: 'Home', component: FeedPage, icon: 'home' },
      { title: 'Found Something', component: FoundPage, icon:'hand' },
      { title: 'Lost Something', component: LostPage, icon:'help'},
      { title: 'Search', component: SearchPage, icon: 'search' },
      { title: 'Chat', component: ListchatPage, icon:'chatbubbles' },
      { title: 'Settings', component: SettingsPage, icon:'settings' },
      { title: 'About', component: AboutAppPage, icon:'information-circle' },
      { title: 'LogOut', component: LogoutPage, icon:'exit' },
    ];
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }

  alertPic(){
    const alert = this.alert.create({
      title:'Feature coming out soon',
      buttons:['OK']
    });
    alert.present();
  }

  ionViewDidLoad(){

  }
}

