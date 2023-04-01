import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ParticularDialogComponent } from '../particular-dialog/particular-dialog.component';
import { Particular } from './particular';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-particulars',
  templateUrl: './particulars.component.html',
  styleUrls: ['./particulars.component.css']
})
export class ParticularsComponent {
  displayedColumns: string[] = ['desc','options'];
  dataSource: any;

  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private http : HttpClient,
    public dialog: MatDialog
  ){
    this.loadParticulars();
  }

  


  getParticulars(){
    return  this.http.get<Particular[]>(`${environment.API_HOST}/api/particulars`);
  }

  loadParticulars(){
    this.getParticulars().subscribe((particulars) => {
      this.dataSource= new MatTableDataSource(particulars);
      this.dataSource.sort = this.sort;
    });
  }

  openDialogNewParticular(){
    const dialogRef = this.dialog.open(ParticularDialogComponent, {
      data: {type: "new"}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadParticulars();
    });
  }

  openDialogUpdateParticular(id:any){
    const dialogRef = this.dialog.open(ParticularDialogComponent, {
      data: {type: "update", id: id}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadParticulars();
    });
  }
}
