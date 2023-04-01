import {Injectable} from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { environment } from './environments/environment';

@Injectable({
    providedIn: 'root'
})

export class AuthService{

    constructor(private http: HttpClient){}

    /*
    verifyToken(callback: (verified: boolean, resp?: any) => void){
        if(localStorage.getItem("tulayan_user_token")){
            this.http.post('http://localhost:3000/api/userinfo',{token: localStorage.getItem("tulayan_user_token")}, { observe: 'response' }).pipe(catchError((error: HttpErrorResponse) => {
                callback(false, false);
                return throwError(() => new Error('Something bad happened; please try again later.'));
            })).subscribe(resp => {
            
            if(resp.status == 200){
                return callback(true, resp.body);
            }
       
            });
        }
    } */

    verifyToken(){
        return this.http.post<Boolean>(`${environment.API_HOST}/api/userinfo`,{token: localStorage.getItem("tulayan_user_token")}, { observe: 'response' });
    }



}