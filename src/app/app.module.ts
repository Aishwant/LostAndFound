import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
import { MyApp } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { FIREBASE_CONFIG } from './app.firebase.config';
import { AngularFireDatabaseModule } from 'angularfire2/database'
import { HttpModule } from '@angular/http';


//pages
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { FeedPage } from '../pages/feed/feed';
import { FoundPage } from '../pages/found/found';
import { LostPage } from '../pages/lost/lost';
import { AboutAppPage } from '../pages/about-app/about-app';
import { ChatPage } from '../pages/chat/chat';
import { ListchatPage } from '../pages/listchat/listchat';
import { SettingsPage } from '../pages/settings/settings';
import { ServicesAuth } from '../providers/services-auth/services-auth';
import { AboutAppPageModule } from '../pages/about-app/about-app.module';
import { LoginPageModule } from '../pages/login/login.module';
import { SignupPageModule } from '../pages/signup/signup.module';
import { FeedPageModule } from '../pages/feed/feed.module';
import { FoundPageModule } from '../pages/found/found.module';
import { LostPageModule } from '../pages/lost/lost.module';
import { ChatPageModule } from '../pages/chat/chat.module';
import { ListchatPageModule } from '../pages/listchat/listchat.module';
import { SettingsPageModule } from '../pages/settings/settings.module';
import { SearchPageModule } from '../pages/search/search.module';
import { SearchPage } from '../pages/search/search';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { ItemDetailsPageModule } from '../pages/item-details/item-details.module';
import { ForgotpwdPage } from '../pages/forgotpwd/forgotpwd';
import { ForgotpwdPageModule} from '../pages/forgotpwd/forgotpwd.module';
import { FirstIntroPage } from '../pages/first-intro/first-intro';
import { FirstIntroPageModule } from '../pages/first-intro/first-intro.module';


import { UserService } from '../providers/user-service/user-service';
import { ItemService} from '../providers/item-service/Item-service';
import { Camera } from '@ionic-native/camera';
import { HttpClientModule } from '@angular/common/http';
import { LogoutPage } from '../pages/logout/logout';
import { LogoutPageModule } from '../pages/logout/logout.module';
import { EditPageModule } from '../pages/edit/edit.module';
import { EditPage } from '../pages/edit/edit';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { DiagnosticProvider } from '../providers/diagnostic/diagnostic';
import { Diagnostic } from '@ionic-native/diagnostic'



let config: SocketIoConfig = {
  url: "http://130.74.227.234:3000",
  options: {}
}

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AboutAppPageModule,
    LoginPageModule,
    SignupPageModule,
    FeedPageModule,
    FoundPageModule,
    LostPageModule,
    ChatPageModule,
    ListchatPageModule,
    SettingsPageModule,
    SearchPageModule,
    ItemDetailsPageModule,
    ForgotpwdPageModule,
    FirstIntroPageModule,
    LogoutPageModule,
    HttpModule,
    HttpClientModule,
    EditPageModule,
    SocketIoModule.forRoot(config)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    SignupPage,
    FeedPage,
    FoundPage,
    LostPage,
    AboutAppPage,
    ChatPage,
    ListchatPage,
    SettingsPage,
    SearchPage,
    ItemDetailsPage,
    ForgotpwdPage,
    FirstIntroPage,
    LogoutPage,
    EditPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ServicesAuth,
    UserService,
    ItemService,
    Camera,
    DiagnosticProvider,
    Diagnostic
  ]
})
export class AppModule {}
