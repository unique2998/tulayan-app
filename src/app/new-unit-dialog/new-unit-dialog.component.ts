import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Unit } from '../units/unit';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-new-unit-dialog',
  templateUrl: './new-unit-dialog.component.html',
  styleUrls: ['./new-unit-dialog.component.css']
})
export class NewUnitDialogComponent {
  id: any;
  type: any;
  desc: any;
  image: any;
  unitDescriptionFormControl = new FormControl('',[Validators.required]);

  constructor(
    private http: HttpClient,
    public dialogRef: MatDialogRef<NewUnitDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){
    let {type} = data;
    this.type = type;

    if(type == "update"){
      let {id} = data;
      this.id = id;

      this.getUnit().subscribe(unit => {
        this.desc = unit.desc;
        this.image = unit.image;
      });

    }
  }

  saveUnit(){
    this.http.post(`${environment.API_HOST}/api/units`,{desc: this.desc, image: this.image}).subscribe((data) => {
        this.dialogRef.close();
      });
  }

  updateUnit(){
    this.http.put(`${environment.API_HOST}/api/units/${this.id}`, {desc: this.desc, image: this.image}, {responseType: 'text'}).subscribe((data) => {
      this.dialogRef.close();
    });
  }

  getUnit(){
    return this.http.get<Unit>(`${environment.API_HOST}/api/units/${this.id}`);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  
}
