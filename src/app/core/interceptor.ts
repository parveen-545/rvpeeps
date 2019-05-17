import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastController } from '@ionic/angular';
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(public toastController: ToastController) { }

    intercept(
        request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(request).pipe(catchError(err => {
            const message = err.error[0];
            this.showError(message);
            // if ([401, 0].indexOf(err.status) !== -1) { }

            const error = err.error.message || err.statusText;
            return throwError(error);
        }));
    }


    async showError(message: string) {
        const toast = await this.toastController.create({
            message,
            duration: 2000,
            showCloseButton: true
        });
        toast.present();
    }

}
