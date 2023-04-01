import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-my-bills',
  templateUrl: './my-bills.component.html',
  styleUrls: ['./my-bills.component.css']
})
export class MyBillsComponent {
  id: any;
  displayedColumns: string[] = ['date', 'particular', 'amount_due','balance','options'];
  dataSource: any;
  last_name: any;
  first_name: any;
  contact: any;

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private http : HttpClient, private router: Router){
    this.loadMyBills();
  }

  getMyBills(){
    return  this.http.post(`${environment.API_HOST}/api/my-bills`,{token: localStorage.getItem("tulayan_user_token")});
  }

  loadMyBills(){
    this.getMyBills().subscribe((bills:any) => {
      this.dataSource = new MatTableDataSource(bills);
      this.dataSource.sort = this.sort;
    });
  }

  managePayments(id:any){
    this.router.navigate([`/my-payments/${id}`]);
  }

  
}
