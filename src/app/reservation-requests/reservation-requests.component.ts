import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { catchError, map, of } from 'rxjs';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-reservation-requests',
  templateUrl: './reservation-requests.component.html',
  styleUrls: ['./reservation-requests.component.css']
})
export class ReservationRequestsComponent {
  displayedColumns: string[] = ['inquirer','photo','img','desc','status','payment','options'];
  dataSource: any;
  @ViewChild(MatSort) sort: any;
  api_host = environment.API_HOST;
  constructor(private http: HttpClient, private _snackBar: MatSnackBar, public dialog: MatDialog){
    this.loadReservationRequests();
  }
  
  getReservationRequests(){
    return  this.http.post(`${environment.API_HOST}/api/reservation-requests`, {token: localStorage.getItem("tulayan_user_token")});
  }

  loadReservationRequests(){
    this.getReservationRequests().subscribe((response: any) => {
      this.dataSource = new MatTableDataSource(response);
      this.dataSource.sort = this.sort;
    });
  }

  approveReservation(id: any, unit_id: any, user_id: any){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {message: "Reservation will be approved and added to tenants lists. Would you like to proceed?"},
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.http.post(`${environment.API_HOST}/api/approve-reservation`, {token: localStorage.getItem("tulayan_user_token"), id: id, unit_id: unit_id, user_id: user_id}, { observe: 'response' }).pipe(map((response : {status: number, body: any}) => {
          if(response.status == 200){
            this.loadReservationRequests();
            this._snackBar.open("Reservation Successfully Approved!");
            return;
          }
          this._snackBar.open("Approval Failed!");
          return;
        }), catchError(error =>{
          this._snackBar.open("Approval Failed!");
          return of(false);
        })).subscribe();        
      }
    });
  }

  cancelReservation(id: any){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {message: "Reservation will be cancelled. Would you like to proceed?"},
    });


    dialogRef.afterClosed().subscribe(result => {
      if(result){

        this.http.post(`${environment.API_HOST}/api/reservation-requests/cancel`, {token: localStorage.getItem("tulayan_user_token"), id: id}, { observe: 'response' }).pipe(map((response : {status: number, body: any}) => {
          if(response.status == 200){
            this.loadReservationRequests();
            this._snackBar.open("Reservation Successfully Cancelled!");
            return;
          }
          this._snackBar.open("Cancellation Failed!");
          return;
        }), catchError(error =>{
          this._snackBar.open("Cancellation Failed!");
          return of(false);
        })).subscribe();




      }
    });



    
  }


  viewProofPayment(filename: string){
    window.open(`${environment.API_HOST}/uploads/${filename}`,"_blank");
  }

  markAllRead(){
    this.http.put(`${environment.API_HOST}/api/mark-notification-read`,{}).subscribe( () => {
      window.location.reload();
    });
  }

}
