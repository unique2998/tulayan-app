import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-new-payment-dialog',
  templateUrl: './new-payment-dialog.component.html',
  styleUrls: ['./new-payment-dialog.component.css']
})
export class NewPaymentDialogComponent {

  type: any;
  bill_id: any;
  date: any;
  particular: any;
  amount_paid: any;

  

  dateFormControl = new FormControl('',[Validators.required]);
  particularFormControl = new FormControl('',[Validators.required]);
  amountPaidFormControl = new FormControl('',[Validators.required]);
    constructor(
      private http: HttpClient,
      public dialogRef: MatDialogRef<NewPaymentDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: {bill_id: number, type: string
      
      }
    ){
      this.type = data.type;
      this.bill_id = data.bill_id;
    }

    savePayment(){

      const date = new Date(this.date);
      const year = date.getFullYear();
      const month = this.pad(date.getMonth() + 1, 2);
      const day = this.pad(date.getDate(), 2);
      
      this.date = `${year}-${month}-${day}`;
      
      this.http.post(`${environment.API_HOST}/api/payments`,{bill_id: this.bill_id, amount_paid: this.amount_paid, date: this.date, particulars: this.particular}).subscribe((data) => {
        this.dialogRef.close();
      });
    }


    updatePayment(){}

    onNoClick(): void {
      this.dialogRef.close();
    }

    pad(num: any, size: number) {
      var s = "000000000" + num;
      
      return s.substring(s.length-size);
    }
}


