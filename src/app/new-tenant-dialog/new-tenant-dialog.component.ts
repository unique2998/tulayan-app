import { Component, Inject } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { Unit } from '../units/unit';
import { HttpClient } from '@angular/common/http';
import { Tenant } from '../tenants/tenant';
import { FormControl, Validators } from '@angular/forms';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-new-tenant-dialog',
  templateUrl: './new-tenant-dialog.component.html',
  styleUrls: ['./new-tenant-dialog.component.css']
})
export class NewTenantDialogComponent {

  users:any;
  units:any;
  user_id: any;
  unit_id: any;

  userFormControl = new FormControl('',[Validators.required]);
  unitFormControl = new FormControl('',[Validators.required]);

  constructor(public dialogRef: MatDialogRef<NewTenantDialogComponent>, 
    private http : HttpClient){

    this.getUsers().subscribe((users) =>{
      this.users = users;
    });


    this.getUnits().subscribe((units: Unit[])=> {
      this.units = units;
    });

    
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getUnits(){
    return  this.http.get<Unit[]>(`${environment.API_HOST}/api/units`);
  }

  getUsers(){
    return  this.http.get(`${environment.API_HOST}/api/users-unreserved`);
  }

  saveTenant(){
    this.http.post(`${environment.API_HOST}/api/tenants`,{unit_id: this.unit_id, user_id: this.user_id}).subscribe((data) => {
      this.dialogRef.close();
    });
    
  }

  
}
