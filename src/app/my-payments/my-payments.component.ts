import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-my-payments',
  templateUrl: './my-payments.component.html',
  styleUrls: ['./my-payments.component.css']
})
export class MyPaymentsComponent implements OnInit {
  bill_id: any;
  bill: any;
  dataSource: any;
  displayedColumns: string[] = ['date', 'particulars', 'amount_paid'];
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor(
    private http : HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    ){}

  getPayments(){
    return  this.http.get(`${environment.API_HOST}/api/payments/${this.bill_id}`);
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.bill_id = params.get('bill_id');
      this.loadPayments();
      this.loadBill();
    });
  }

  

  getBill(){
    return  this.http.get(`${environment.API_HOST}/api/bills/get/${this.bill_id}`);
  }


  loadPayments(){
    this.getPayments().subscribe((payments:any) => {
      this.dataSource = new MatTableDataSource(payments);
      this.dataSource.sort = this.sort;
    });
  }

  

  loadBill(){
    this.getBill().subscribe((bill: any) => {
      this.bill = bill;
    });
  }

  goBack(){
    this.router.navigate(['my-bills']);
  }

}
