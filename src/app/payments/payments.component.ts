import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Payment } from './payment';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Bill } from '../bills/bill';
import { MatDialog } from '@angular/material/dialog';
import { NewPaymentDialogComponent } from '../new-payment-dialog/new-payment-dialog.component';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {

  
  bill_id: any;
  bill: any;
  dataSource: any;
  displayedColumns: string[] = ['date', 'particulars', 'amount_paid'];


  @ViewChild(MatSort) sort!: MatSort;


  constructor(
    private http : HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog
    ){

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.bill_id = params.get('bill_id');
      this.loadPayments();
      this.loadBill();
    });
  }

  getPayments(){
    return  this.http.get<Payment[]>(`${environment.API_HOST}/api/payments/${this.bill_id}`);
  }

  getBill(){
    return  this.http.get<Bill>(`${environment.API_HOST}/api/bills/get/${this.bill_id}`);
  }


  loadPayments(){
    this.getPayments().subscribe((payments:Payment[]) => {
      this.dataSource = new MatTableDataSource(payments);
      this.dataSource.sort = this.sort;
    });
  }

  

  loadBill(){
    this.getBill().subscribe((bill: Bill) => {
      this.bill = bill;
    });
  }

  goBack(){
    this.router.navigate(['../../'],{relativeTo: this.route});
  }

  openDialogNewPayment(): void {
    const dialogRef = this.dialog.open(NewPaymentDialogComponent, {
      data: {bill_id: this.bill_id, type: "new"}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadPayments();
    });
  }

}
