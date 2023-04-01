import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ChangePasswordDialogComponent } from '../change-password-dialog/change-password-dialog.component';
import { environment } from '../environments/environment';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {

  api_host = environment.API_HOST;

  @ViewChild(MatSort) sort!: MatSort;
  dataSource: any;
  displayedColumns: string[] = ['photo','firstname','lastname','contact','email','address','birth_date','occupation','options'];
  constructor(private http : HttpClient, public dialog: MatDialog){
    this.loadUsers();
  }

  getUsers(){
    return  this.http.get(`${environment.API_HOST}/api/users`);
  } 
 
  loadUsers(){
    this.getUsers().subscribe((users: any) => {
      this.dataSource= new MatTableDataSource(users);
      this.dataSource.sort = this.sort;
    });
  }

  openDialogChangePassword(id: any){
    const dialogRef = this.dialog.open(ChangePasswordDialogComponent, {
      data: {user_id : id}
    });

    
  }

}
