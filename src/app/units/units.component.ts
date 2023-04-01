import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Unit } from './unit';
import {MatSort, Sort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { NewUnitDialogComponent } from '../new-unit-dialog/new-unit-dialog.component';
import { environment } from '../environments/environment';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { catchError, map, of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-units',
  templateUrl: './units.component.html',
  styleUrls: ['./units.component.css']
})
export class UnitsComponent {
  displayedColumns: string[] = ['desc','image','options'];
  dataSource: any;

  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private http : HttpClient,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
    ){
    this.loadUnits();
  }

  getUnits(){
    return  this.http.get<Unit[]>(`${environment.API_HOST}/api/units`);
  }

  loadUnits(){
    this.getUnits().subscribe((units:Unit[]) => {
      this.dataSource= new MatTableDataSource(units);
      this.dataSource.sort = this.sort;
    });
  }

  openDialogNewUnit(){
    const dialogRef = this.dialog.open(NewUnitDialogComponent, {
      data: {type: "new"}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadUnits();
    });
  }

  openDialogUpdateUnit(id:any){
    const dialogRef = this.dialog.open(NewUnitDialogComponent, {
      data: {type: "update", id: id}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadUnits();
    });
  }

  openDialogConfirmDelete(id:any){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {message: "This cannot be undone. Would you like to proceed?"},
    });


    dialogRef.afterClosed().subscribe(result => {
      if(result){

        this.http.delete(`${environment.API_HOST}/api/units/${id}`, { observe: 'response' }).pipe(map((response: any) => {
          let {status} = response;
          if(status == 200){
            this.loadUnits();
            this._snackBar.open("Unit Successfully Deleted!");
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
