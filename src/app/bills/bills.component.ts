import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Bill } from './bill';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Tenant } from '../tenants/tenant';
import { MatDialog } from '@angular/material/dialog';
import { NewBillDialogComponent } from '../new-bill-dialog/new-bill-dialog.component';
import { environment } from '../environments/environment';


@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.css']
})
export class BillsComponent implements OnInit {

  id: any;
  displayedColumns: string[] = ['date', 'particular', 'amount_due','balance','options'];
  dataSource: any;
  last_name: any;
  first_name: any;
  contact: any;

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private route: ActivatedRoute, private http : HttpClient, private router: Router, public dialog: MatDialog){
    
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.loadBills();
      this.loadTenant();




    });

    
  }

  getBills(){
    return  this.http.get<Bill[]>(`${environment.API_HOST}/api/bills/${this.id}`);
  }

  getTenant(){
    return  this.http.get<Tenant>(`${environment.API_HOST}/api/tenants/${this.id}`);
  }

  goBack(){
    this.router.navigate(['tenants']);
  }


  loadTenant(){
    this.getTenant().subscribe((tenant:Tenant) => {
      this.last_name = tenant.last_name;
      this.first_name = tenant.first_name;
      this.contact = tenant.contact;
    });
  }




  loadBills(){
    this.getBills().subscribe((bills:Bill[]) => {
      this.dataSource = new MatTableDataSource(bills);
      this.dataSource.sort = this.sort;
    });
  }


  openDialogNewBill(): void {
    const dialogRef = this.dialog.open(NewBillDialogComponent, {
      data: {tenant_id: this.id, type: "new"}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadBills();
    });
  }

  openDialogUpdateBill(bill_id: number): void {
    const dialogRef = this.dialog.open(NewBillDialogComponent, {
      data: {bill_id: bill_id, type: "update"}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadBills();
    });
  }

  managePayments(bill_id: number){
    this.router.navigate([`/tenants/${this.id}/bills/${bill_id}/payments`]);
  }




  
}
