import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { catchError, map, of } from 'rxjs';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { Unit } from '../units/unit';
import { environment } from '../environments/environment';
import { UpdateUserinfoDialogComponent } from '../update-userinfo-dialog/update-userinfo-dialog.component';

@Component({
  selector: 'app-units-available',
  templateUrl: './units-available.component.html',
  styleUrls: ['./units-available.component.css']
})
export class UnitsAvailableComponent {
  displayedColumns: string[] = ['img','desc','options'];
  @ViewChild(MatSort) sort: any;
  dataSource: any;

  constructor(private http: HttpClient, private _snackBar: MatSnackBar, public dialog: MatDialog){
    this.loadUnitsAvailable();
  }

  loadUnitsAvailable(){
    this.getAvailableUnits().subscribe(units => {
      this.dataSource = new MatTableDataSource(units);
      this.dataSource.sort = this.sort;
    });
  }


  getAvailableUnits(){
    return  this.http.post<Unit[]>(`${environment.API_HOST}/api/units-available`, {token: localStorage.getItem("tulayan_user_token")});
  }

  requestReservation(id: any){


    this.http.post(`${environment.API_HOST}/api/check-userinfo`, {token: localStorage.getItem("tulayan_user_token")}).subscribe((response: any) => {
      let {is_userinfo_incomplete} = response;

      if(is_userinfo_incomplete){
        this.updateUserInfoDialog();
      }else{

        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
          data: {message: "Reservation request will be sent. Would you like to proceed?"},
        });
    
        dialogRef.afterClosed().subscribe(result => {
          if(result){
    
            this.http.post(`${environment.API_HOST}/api/reservations`, {token: localStorage.getItem("tulayan_user_token"), unit_id: id}, { observe: 'response' }).pipe(map((response : {status: number, body: any}) => {
              if(response.status == 200){
                this.loadUnitsAvailable();
                this._snackBar.open("Reservation Request Successfully Sent!");
                return;
              }
              this._snackBar.open("Reservation Failed!");
              return;
            }), catchError(error =>{
              this._snackBar.open("Reservation Failed!");
              return of(false);
            })).subscribe();
    
    
    
    
          }
        });

      }


    });

  }

  updateUserInfoDialog(){
    const dialogRef = this.dialog.open(UpdateUserinfoDialogComponent, {
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
    });   
  }

}
