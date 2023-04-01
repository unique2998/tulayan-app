import { Component, ViewChild } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Tenant } from './tenant';
import {MatSort, Sort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { NewTenantDialogComponent } from '../new-tenant-dialog/new-tenant-dialog.component';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { catchError, map, of } from 'rxjs';
import { environment } from '../environments/environment';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-tenants',
  templateUrl: './tenants.component.html',
  styleUrls: ['./tenants.component.css']
})
export class TenantsComponent{
  api_host = environment.API_HOST;
  displayedColumns: string[] = ['photo', 'last_name', 'first_name', 'address', 'birth_date', 'contact', 'email', 'occupation', 'desc','options'];
  dataSource: any;
  selectedTenant: any;
  tokenVerified: boolean = false;
  userInfo = {first_name: null, last_name: null, email: null, role_id: null};

  @ViewChild(MatSort) sort!: MatSort;
  
  constructor(private http : HttpClient, public dialog: MatDialog, private router: Router, private auth: AuthService, private _snackBar: MatSnackBar){

    this.loadTenants();

    auth.verifyToken().pipe(map((resp: {status: any, body: any } ) => {
      if(resp.status == 200){
        this.tokenVerified = true;
        const {first_name, last_name, email, role_id} = resp.body;
        this.userInfo.first_name = first_name;
        this.userInfo.last_name = last_name;
        this.userInfo.email = email;
        this.userInfo.role_id = role_id;
      }
      this.tokenVerified = false;
    }), catchError(error => {
      this.tokenVerified = false;
      return of(false);
    })).subscribe();

    
    /*
    auth.verifyToken((verified, {first_name, last_name, email, role_id}) => {

      this.tokenVerified = verified;
      this.userInfo = {
        first_name: first_name,
        last_name: last_name,
        email: email,
        role_id: role_id
      };
    }); */


  }
  
  getTenants(){
    return  this.http.get<Tenant[]>(`${environment.API_HOST}/api/tenants`);
  }

  loadTenants(){
    this.getTenants().subscribe((tenants:Tenant[]) => {
      this.dataSource= new MatTableDataSource(tenants);
      this.dataSource.sort = this.sort;
    });
  }

  manageBilling(id: number){
    this.router.navigate([`/tenants/${id}/bills`]);
  }

  

  openDialogNewTenant(): void {
    const dialogRef = this.dialog.open(NewTenantDialogComponent, {});

    dialogRef.afterClosed().subscribe(result => {
      this.loadTenants();
    });
  }

  openDialogConfirmDelete(id:any){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {message: "This cannot be undone. Would you like to proceed?"},
    });


    dialogRef.afterClosed().subscribe(result => {
      if(result){

        this.http.delete(`${environment.API_HOST}/api/tenants/${id}`, { observe: 'response' }).pipe(map((response: any) => {
          let {status} = response;
          if(status == 200){
            this.loadTenants();
            this._snackBar.open("Tenant Successfully Deleted!");
            return;
          }
          this._snackBar.open("Failed to Delete!");
          return;
        }), catchError(error =>{
          console.log(error);
          this._snackBar.open("Failed to Delete!");
          return of(false);
        })).subscribe();




      }
    });    
  }


      
  }



 

    




