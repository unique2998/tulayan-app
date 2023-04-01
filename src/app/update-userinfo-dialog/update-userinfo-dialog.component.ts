import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map } from 'rxjs';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-update-userinfo-dialog',
  templateUrl: './update-userinfo-dialog.component.html',
  styleUrls: ['./update-userinfo-dialog.component.css']
})
export class UpdateUserinfoDialogComponent {
  file: File | undefined;
  address: any;
  birth_date: any;
  occupation: any;
  occupations: any;


  photoFormControl = new FormControl('',[Validators.required]);
  addressFormControl = new FormControl('',[Validators.required]);
  birthDateFormControl = new FormControl('',[Validators.required]);
  occupationFormControl = new FormControl('',[Validators.required]);
  
  constructor(
    private http : HttpClient,
    public dialogRef: MatDialogRef<UpdateUserinfoDialogComponent>,
    private _snackBar: MatSnackBar
  ){
    this.loadOccupations();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  
  onFileSelected(event: any){
    this.file = event.target.files[0];
  }


  getOccupations(){
    return  this.http.get(`${environment.API_HOST}/api/occupations`);
  }

  loadOccupations(){
    this.getOccupations().subscribe(occupations => {
      this.occupations = occupations;
    });
  }

  updateUserInfo(){
    if(this.file){
      const date = new Date(this.birth_date);
      const year = date.getFullYear();
      const month = this.pad(date.getMonth() + 1, 2);
      const day = this.pad(date.getDate(), 2);
    
    let _birth_date = `${year}-${month}-${day}`;
      let formData = new FormData();
      formData.append('token', localStorage.getItem("tulayan_user_token") ?? '');
      formData.append('photo', this.file);
      formData.append('address', this.address);
      formData.append('birth_date', _birth_date);
      formData.append('occupation', this.occupation);

      this.http.put(`${environment.API_HOST}/api/update-userinfo`, formData,{ headers: {},observe: 'response' }).pipe(map((response : {status: number, body: any}) => {
        if(response.status == 200){
          this.dialogRef.close();
          this._snackBar.open("Use Info Successfully Updated!");
        }else{
          this._snackBar.open("Failed!");
        }
      })).subscribe(response => {
        console.log(response);
        
      });

    }
  }

  pad(num: any, size: number) {
    var s = "000000000" + num;
    
    return s.substring(s.length-size);
  }



}
