import { Router } from '@angular/router';
import { AuthService } from '../app/core/providers/auth.service';
import { Component } from '@angular/core';

import { Platform, ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { MenuController } from '@ionic/angular';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService,
    private nativeStorage: NativeStorage,
    private router: Router,
    private menu: MenuController,
    public toastController: ToastController
  ) {
    // this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      // Here we will check if the user is already logged in
      // because we don't want to ask users to log in each time they open the app
      this.nativeStorage.getItem('google_user').then(
        data => {
          // user is previously logged and we have his data
          // we will let him access the app
          this.router.navigate(['/user']);
          this.splashScreen.hide();
        },
        error => {
          this.router.navigate(['/login']);
          this.splashScreen.hide();
        }
      );

      // Here we will check if the user is already logged in
      // because we don't want to ask users to log in each time they open the app
      this.nativeStorage.getItem('facebook_user').then(
        data => {
          // user is previously logged and we have his data
          // we will let him access the app
          this.router.navigate(['/members/create-profile']);
          this.splashScreen.hide();
        },
        err => {
          // we don't have the user data so we will ask him to log in
          this.router.navigate(['/login']);
          this.splashScreen.hide();
        }
      );
    });
  }

  logout() {
    // TODO: detect if user logged in with fb
    this.authService.doFbLogout().subscribe((response: any) => {
      console.log('response-----> ', response);
    }, (error: any) => {
      console.log('error----------> ', error);
    });

    this.nativeStorage.remove('user');
    this.router.navigateByUrl('login');
    this.showMessage('Logged out successfully');
  }


  navigateTo(page: string) {
    switch (page) {
      case 'MyProfile': {
        this.router.navigate(['/members/profile-list']);
        break;
      }
      case 'Location': {
        this.router.navigate(['/members/location']);
        break;
      }
      case 'Chat': {
        this.router.navigate(['/members/chat']);
        break;
      }

      case 'about': {
        this.router.navigate(['about']);
        break;
      }

      case 'faq': {
        this.router.navigate(['faq']);
        break;
      }

      case 'Nearby': {
        this.router.navigate(['/members/nearby']);
        break;
      }
      default: {
        console.log('Invalid choice');
        break;
      }
    }
  }

  async showMessage(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }
}
