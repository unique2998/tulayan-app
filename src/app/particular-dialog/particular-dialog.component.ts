import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Particular } from '../particulars/particular';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-particular-dialog',
  templateUrl: './particular-dialog.component.html',
  styleUrls: ['./particular-dialog.component.css']
})
export class ParticularDialogComponent {
  id: any;
  type: any;
  description: any;
  particularDescriptionFormControl = new FormControl('',[Validators.required]);

  constructor(
    private http: HttpClient,
    public dialogRef: MatDialogRef<ParticularDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){
    let {type} = data;
    this.type = type;

    if(type == "update"){
      let {id} = data;
      this.id = id;

      this.getParticular().subscribe(particular => {
        this.description = particular.description;
      });

    }
  }

  saveParticular(){
    this.http.post(`${environment.API_HOST}/api/particulars`,{description: this.description}).subscribe((data) => {
        this.dialogRef.close();
      });
  }

  updateParticular(){
    this.http.put(`${environment.API_HOST}/api/particulars/${this.id}`, {description: this.description}, {responseType: 'text'}).subscribe((data) => {
      this.dialogRef.close();
    });
  }

  getParticular(){
    return this.http.get<Particular>(`${environment.API_HOST}/api/particulars/${this.id}`);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
