import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-change-password-dialog',
  templateUrl: './change-password-dialog.component.html',
  styleUrls: ['./change-password-dialog.component.css']
})
export class ChangePasswordDialogComponent {
  user_id: any;
  password: any;
  passwordFormControl = new FormControl('',[Validators.required]);

  constructor(
    private http: HttpClient,
    public dialogRef: MatDialogRef<ChangePasswordDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){
    let {user_id} = data;
    this.user_id = user_id;
  }

  savePassword(){
    this.http.put(`${environment.API_HOST}/api/users/${this.user_id}`,{token: localStorage.getItem("tulayan_user_token"), password: this.password}, {responseType: 'text'}).subscribe((data) => {
        this.dialogRef.close();
      });
  }


  onNoClick(): void {
    this.dialogRef.close();
  }
}
