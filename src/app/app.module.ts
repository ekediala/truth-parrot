import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { SQLite } from '@ionic-native/sqlite/ngx';

import { HttpClientModule } from '@angular/common/http';
import { PandaComponent } from './panda-component/panda-component.component';

@NgModule({
  declarations: [AppComponent, PandaComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule],
  providers: [
    StatusBar,
    TextToSpeech,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    SQLite, SQLitePorter
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
