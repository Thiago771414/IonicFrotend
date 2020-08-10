import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { StorageService } from 'src/services/storage.service';
import { AlertController } from '@ionic/angular';
import { FieldMessage } from 'src/models/fieldmessage';
import { ValidatorFn } from '@angular/forms';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(public storage: StorageService, public alertCtrl: AlertController) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req)

        .pipe(        
              catchError(error => {

                let errorObj = error;
                if(errorObj.error){
                    errorObj = errorObj.error;
                }

                //erro se o objeto não for json
                if(!errorObj.status){
                    errorObj = JSON.parse(errorObj);
                }

                console.log("Erro detectado pelo interceptor:");
                console.log(errorObj);

                switch(errorObj.status) {
                    case 401:
                    this.handle401();
                    break;

                    case 403:
                    this.handle403();
                    break;

                    case 422:
                    this.handle422(errorObj);
                    break;

                    default:
                    this.handleDefaultError(errorObj);
                }

                return throwError(errorObj);
            }) as any
        )
    }

    handle403() {
        this.storage.setLocalUser(null);
    }

    async handle401() {
        const alert = await this.alertCtrl.create({
            //cssClass: 'my-custom-class',
            header: 'Erro 401: falha de autenticação',
            //subHeader: 'Subtitle',
            message: 'Email ou senha incorretos',
            buttons: [
                {
                    text: 'Ok'
                }
            ]
        });
        await alert.present();
    }

    async handle422(errorObj) {
        let alert = await this.alertCtrl.create({
            header: 'Email já Cadastrado!',
            message: this.listErrors(errorObj.errors, errorObj.listErrors),
            buttons: [
                {
                    text: 'Ok'
                }
            ]
        });
        alert.present();
    }

    async handleDefaultError(errorObj) {
        const alert = await this.alertCtrl.create({
            //cssClass: 'my-custom-class',
            header: 'Erro ' + errorObj.status + ': ' + errorObj.error,
            //subHeader: 'Subtitle',
            message: errorObj.message,
            buttons: [
                {
                    text: 'Ok'
                }
            ]
        });
        await alert.present();
    }

    private listErrors(maxLength : number, message : FieldMessage[]) : string {
        let s : string = '';
        for (var i=0; i<maxLength; i++) {
            s = s + '<p><strong>' + message[i].fieldName + "</strong>: " + message[i].message + '</p>';
        }
        return s;
    }
}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};
