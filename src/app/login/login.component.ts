import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, of } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from "../auth.service";
import SwiperCore, { EffectCoverflow, Pagination, Navigation, Autoplay } from "swiper";
import { environment } from '../environments/environment';

SwiperCore.use([EffectCoverflow, Pagination, Navigation, Autoplay]);

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css','./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent {

  email: any;
  password: any;
  errorMessage = "";

  constructor(private http: HttpClient, private router: Router, private _snackBar: MatSnackBar, private auth: AuthService){}

  loginUser(){
    this.http.post(`${environment.API_HOST}/api/auth`, {email: this.email, password: this.password}, { observe: 'response' }).pipe(map((response: any) => {
      let {status, body} = response;

      if(status == 200){
        let {token} = body;
        localStorage.setItem("tulayan_user_token", token);
        //this.router.navigate(['tenants']);
        this.auth.verifyToken().pipe(map((response : {status: number, body: any}) => {
          if(response.status == 200){
              const {role_id} = response.body;
              if(role_id == 1){
                  this.router.navigate(['tenants']);
                  return;
              }

              if(role_id == 2){
                this.router.navigate(['units-available']);
                return;
            }
              
          }
          this.router.navigate(['login']);
          return false;
          
      }), catchError((error) => {
          this.router.navigate(['login']);
          return of(false);
      })).subscribe();
        return;
      }

      this.errorMessage = "Invalid Email or Password!";
      this._snackBar.open("Invalid Email or Password!", "Try Again");

    }), catchError(err => {

      this.errorMessage = "Invalid Email or Password!";
      this._snackBar.open("Invalid Email or Password!", "Try Again");
      return of(false);
    })).subscribe();
  }

  registerUser(){
    this.router.navigate([`/register`]);
  }

}
