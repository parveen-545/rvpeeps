import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { Storage } from '@ionic/storage';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  AUTH_SERVER_ADDRESS: string = environment.API_URL;
  authSubject = new BehaviorSubject(false);
  nearbyPeepsList;
  constructor(private  httpClient: HttpClient, private  storage: Storage) {}

  // Search Nearby Peeps Service
  searchNearby(lat:string, long:string): Observable<any> {
   // return this.httpClient.get(`${this.AUTH_SERVER_ADDRESS}/api/location/nearby?q=${lat},${long}`).pipe(
    return this.httpClient.get(`${this.AUTH_SERVER_ADDRESS}/api/location/nearby?q= -112.110492,36.098948`).pipe(
      tap(async (res: any) => {
        if (res) {
         this.nearbyPeepsList = res;
        }
      })
    );
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
