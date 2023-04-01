import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Bill } from '../bills/bill';
import { HttpClient } from '@angular/common/http';
import { FormControl,Validators } from '@angular/forms';
import { Particular } from '../particulars/particular';
import { environment } from '../environments/environment';


@Component({
  selector: 'app-new-bill-dialog',
  templateUrl: './new-bill-dialog.component.html',
  styleUrls: ['./new-bill-dialog.component.css']
})
export class NewBillDialogComponent {

  bill: Bill;
  dateFormControl = new FormControl('',[Validators.required]);
  particularFormControl = new FormControl('',[Validators.required]);
  amountDueFormControl = new FormControl('',[Validators.required]);
  type: string;
  bill_id: number;
  out: any;
  particulars: any;

  constructor(
    public dialogRef: MatDialogRef<NewBillDialogComponent>,
    private http : HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: {tenant_id: number, type: string, bill_id: number}
    ){
    this.bill = {} as Bill;
    this.bill.tenant_id = data.tenant_id;
    this.type = data.type;
    this.bill_id = data.bill_id;
    this.loadParticulars();

    if(this.type == "update"){
      this.getBill().subscribe((bill) =>{
        this.bill.id = bill.id;
        this.bill.date = bill.date;
        this.bill.particular = bill.particular;
        this.bill.amount_due = bill.amount_due;
      });
    }


  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  saveBill(){

    const date = new Date(this.bill.date);
    const year = date.getFullYear();
    const month = this.pad(date.getMonth() + 1, 2);
    const day = this.pad(date.getDate(), 2);
    
    this.bill.date = `${year}-${month}-${day}`;

    
    this.http.post(`${environment.API_HOST}/api/bills`,this.bill).subscribe((data) => {
      this.dialogRef.close();
    });



    
    
    
  }

  updateBill(){

    const date = new Date(this.bill.date);
    const year = date.getFullYear();
    const month = this.pad(date.getMonth() + 1, 2);
    const day = this.pad(date.getDate(), 2);
    
    this.bill.date = `${year}-${month}-${day}`;



    this.http.put(`${environment.API_HOST}/api/bills/${this.bill.id}`,this.bill, {responseType: 'text'}).subscribe((data) => {
      this.dialogRef.close();
    });

    

    

    
    
  }

  getBill(){
    return this.http.get<Bill>(`${environment.API_HOST}/api/bills/get/${this.bill_id}`);
    
  }


  pad(num: any, size: number) {
    var s = "000000000" + num;
    
    return s.substring(s.length-size);
  }


  getParticulars(){
    return  this.http.get<Particular[]>(`${environment.API_HOST}/api/particulars`);
  }

  loadParticulars(){
    this.getParticulars().subscribe(particulars => {
      this.particulars = particulars;
    });
  }

}
