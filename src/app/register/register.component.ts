import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  first_name: any;
  last_name: any;
  email: any;
  contact: any;
  password: any;

  firstnameFormControl = new FormControl('',[Validators.required]);
  lastnameFormControl = new FormControl('',[Validators.required]);
  emailFormControl = new FormControl('',[Validators.required]);
  contactFormControl = new FormControl('',[Validators.required]);
  passwordFormControl = new FormControl('',[Validators.required]);

  constructor(private http: HttpClient, private router: Router, private _snackBar: MatSnackBar){}

  loginUser(){
    this.router.navigate([`/login`]);
  }

  registerUser(){
    this.http.post(`${environment.API_HOST}/api/users`,{first_name: this.first_name, last_name: this.last_name, email: this.email, contact: this.contact, password: this.password}, { observe: 'response' }).pipe(map(response => {
      if(response.status == 200){
        this.router.navigate([`/login`]);
        
      }

    }), catchError(error => {
      this._snackBar.open(error.error, "Try Again");
      return of(false);
    })).subscribe();
  }

}
