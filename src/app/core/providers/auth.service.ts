import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Platform } from '@ionic/angular';
import { tap, catchError } from 'rxjs/operators';
import { Observable, BehaviorSubject, throwError } from 'rxjs';

import { Storage } from '@ionic/storage';
import { User } from '../interfaces/user';
import { AuthResponse } from '../interfaces/auth-response';
import { environment } from '../../../environments/environment';
import { Facebook } from '@ionic-native/facebook/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Router } from '@angular/router';

const TOKEN_KEY = 'auth-token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  AUTH_SERVER_ADDRESS: string = environment.API_URL;
  authSubject = new BehaviorSubject(false);
  constructor(private httpClient: HttpClient,
    private storage: Storage,
    private plt: Platform,
    private fb: Facebook,
    private nativeStorage: NativeStorage,
    private router: Router) {
    //   this.plt.ready().then(() => {
    //  // this.getToken();
    // });
  }

  getToken() {
    this.storage.get(TOKEN_KEY).then(res => {
      if (res) {
        this.authSubject.next(true);
      }
    })
  }

  // Registeration Service
  register(user: User): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(`${this.AUTH_SERVER_ADDRESS}/api/users`, user).pipe(
      tap(async (res: AuthResponse) => {
        if (res) {
          await this.storage.set("ACCESS_TOKEN", res.token);
          //await this.storage.set("EXPIRES_IN", res.user.expires_in);
          this.authSubject.next(true);
        }
      })

    );
  }
  // Login Service
  login(user: User): Observable<AuthResponse> {
    return this.httpClient.post(`${this.AUTH_SERVER_ADDRESS}/api/users/login`, user).pipe(
      tap(async (res: AuthResponse) => {
        if (res) {
          await this.storage.set('ACCESS_TOKEN', res.token );
          await this.storage.set('EXPIRES_IN', res.expires_in);
          this.authSubject.next(true);
        }
      })
    );
  }
  // Logout Service
  async logout() {
    await this.storage.remove('ACCESS_TOKEN');
    await this.storage.remove('EXPIRES_IN');
    this.authSubject.next(false);
  }
  // To Check LoggedIn state
  isLoggedIn() {
    return this.authSubject.asObservable();
  }

  forgotPassowrd(email: string): Observable<any> {
    return this.httpClient.post(`${this.AUTH_SERVER_ADDRESS}/api/reset-password`, email)
      .pipe(catchError(this.handleError));
  }
  sendOtp(otp: string, email: string): Observable<any> {
    // send otp
    return this.httpClient.post(`${this.AUTH_SERVER_ADDRESS}/api/verify-otp`, { email, otp })
      .pipe(catchError(this.handleError));
  }

  updatePassword(password: string, email: string): Observable<any> {
    // Reset Password
    return this.httpClient.post(`${this.AUTH_SERVER_ADDRESS}/api/update-password`, { email, password })
      .pipe(catchError(this.handleError));
  }

  doFbLogout() {
    return Observable.create(observer => {
      this.fb.logout().then(
        res => {
          // user logged out so we will remove him from the NativeStorage
          this.nativeStorage.remove('facebook_user');
          this.router.navigate(['/login']);
          observer.next(res);
        },
        error => {
          console.log(error);
          observer.error(new Error(error));
        }
      );
    });
  }



  handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: $(err.error.message)`;
    } else {
      errorMessage = `Server returened code: ${err.status}, error message is : $(err.message)`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
