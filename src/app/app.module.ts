import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';
import { Facebook } from '@ionic-native/facebook/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';

import { AuthModule } from './auth/auth.module';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { ErrorInterceptor } from './core/interceptor';
import { TokenInterceptor } from './core/interceptors/token.interceptor';
import { ComponentsModule } from './components/components.module';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [FooterComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AuthModule,
    ComponentsModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    NativeStorage,
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    Facebook,
    GooglePlus,
    Geolocation,
    NativeGeocoder,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
 
})
export class AppModule {}
