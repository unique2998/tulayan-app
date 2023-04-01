import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { catchError, map, of } from 'rxjs';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { environment } from '../environments/environment';
import { UploadFileDialogComponent } from '../upload-file-dialog/upload-file-dialog.component';



@Component({
  selector: 'app-my-reservations',
  templateUrl: './my-reservations.component.html',
  styleUrls: ['./my-reservations.component.css']
})
export class MyReservationsComponent {
  displayedColumns: string[] = ['img','desc','status','options','payment'];
  dataSource: any;
  @ViewChild(MatSort) sort: any;

  constructor(private http: HttpClient, private _snackBar: MatSnackBar, public dialog: MatDialog){
    this.loadMyReservations();
  }

  loadMyReservations(){
    this.getMyReservations().subscribe((response: any) => {
      this.dataSource = new MatTableDataSource(response);
      this.dataSource.sort = this.sort;
    });
  }

  getMyReservations(){
    return  this.http.post(`${environment.API_HOST}/api/my-reservations`, {token: localStorage.getItem("tulayan_user_token")});
  }

  cancelReservation(id: any){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {message: "Reservation will be cancelled. Would you like to proceed?"},
    });


    dialogRef.afterClosed().subscribe(result => {
      if(result){

        this.http.post(`${environment.API_HOST}/api/my-reservations/cancel`, {token: localStorage.getItem("tulayan_user_token"), id: id}, { observe: 'response' }).pipe(map((response : {status: number, body: any}) => {
          if(response.status == 200){
            this.loadMyReservations();
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

  uploadFileDialog(id: any){
    const dialogRef = this.dialog.open(UploadFileDialogComponent,{
      data: {reservation_id: id}
    });


    dialogRef.afterClosed().subscribe(result => {
      this.loadMyReservations();
      if(result){

      }
    });



    
  }

  viewProofPayment(filename: string){
    window.open(`${environment.API_HOST}/uploads/${filename}`,"_blank");
  }

}
