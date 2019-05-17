import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/providers/auth.service';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';
import { Facebook } from '@ionic-native/facebook/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  loginform: FormGroup;
  FB_APP_ID: number = environment.FB_APP_ID;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private fb: Facebook,
    private googlePlus: GooglePlus,
    private nativeStorage: NativeStorage
  ) { }
  validationmessages = {
    email: [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Please enter a valid email.' }
    ],
    password: [
      { type: 'required', message: 'Password is required.' },
      {
        type: 'minlength',
        message: 'Password must be at least 5 characters long.'
      },
      {
        type: 'pattern',
        message:
          'Your password must contain at least one uppercase, one lowercase, and one number.'
      }
    ]
  };
  ngOnInit() {
    this.loginform = this.formBuilder.group({
      password: new FormControl('', Validators.required),
      email: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
        ])
      )
    });
  }

  login(form) {
    this.authService.login(form).subscribe((user: any) => {
      console.log(user);

      // TODO: Add token to storage

      this.nativeStorage
        .setItem('user_details', {
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          id: user.id,
          token: user.token,
          cordinates: user.cordinates
        })
        .then(
          () => {
            this.router.navigateByUrl('members/create-profile');
          },
          error => {
            // TODO: Show toast with error
            console.log(error);
          }
        );

    });
  }

  // Facebook Login Functionality

  async doFbLogin() {
    // the permissions your facebook app needs from the user
    const permissions = ['public_profile', 'email'];

    this.fb.login(permissions).then(
      response => {
        const userId = response.authResponse.userID;

        // Getting email,first_name,last_name properties
        this.fb.api('/me?fields=email,first_name,last_name', permissions).then(user => {
          user.picture =
            'https://graph.facebook.com/' + userId + '/picture?type=large';
          // now we have the users info, let's save it in the NativeStorage
          this.nativeStorage
            .setItem('facebook_user', {
              first_name: user.first_name,
              last_name: user.last_name,
              email: user.email,
              picture: user.picture
            })
            .then(
              () => {
                this.router.navigate(['/members/create-profile']);
              },
              error => {
                console.log(error);
              }
            );
        });
      },
      error => {
        console.log(error);
      }
    );
  }

  doFbLogout() {
    this.authService.doFbLogout().subscribe((response: any) => {
        console.log(response);
    }, (error: any) => {
      console.log(error);
    });
  }

  /*********************Google Login  **************************/
  async doGoogleLogin() {
    this.googlePlus
      .login({
        scopes: '', // optional, space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
        webClientId: environment.WEB_CLIENT_ID, // optional clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
        offline: false // Optional, but requires the webClientId - if set to true the plugin will also return a serverAuthCode, which can be used to grant offline access to a non-Google server
      })
      .then(
        user => {
          console.log(user.displayName);
          this.nativeStorage
            .setItem('google_user', {
              name: user.displayName,
              email: user.email,
              picture: user.imageUrl
            })
            .then(
              () => {
                this.router.navigate(['/members/create-profile']);
              },
              error => {
                console.log(error);
              }
            );
        },
        err => {
          console.log(err);
        }
      );
  }

  doGoogleLogout() {
    this.googlePlus.logout().then(
      res => {
        // user logged out so we will remove him from the NativeStorage
        this.nativeStorage.remove('google_user');
        this.router.navigate(['/login']);
      },
      err => {
        console.log(err);
      }
    );
  }
}
