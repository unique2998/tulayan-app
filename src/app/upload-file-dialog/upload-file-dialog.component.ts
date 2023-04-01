import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map } from 'rxjs';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-upload-file-dialog',
  templateUrl: './upload-file-dialog.component.html',
  styleUrls: ['./upload-file-dialog.component.css']
})
export class UploadFileDialogComponent {

  file: File | undefined;
  reservation_id: any;

  constructor(
    private http: HttpClient,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<UploadFileDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {reservation_id: number}
  ){
    this.reservation_id = data.reservation_id;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onFileSelected(event: any){
    this.file = event.target.files[0];
    console.log(this.file);
  }

  uploadProofOfPayment(){
    if(this.file){
      const formData = new FormData();
      formData.append('receipt', this.file);
      formData.append('reservation_id', this.reservation_id);
      this.http.post(`${environment.API_HOST}/api/upload`, formData,{ headers: {},observe: 'response' }).pipe(map((response : {status: number, body: any}) => {
        if(response.status == 200){
          this.dialogRef.close();
          this._snackBar.open("Proof of Payment Successfully Uploaded");
        }else{
          this._snackBar.open("Upload Failed");
        }
      })).subscribe(response => {
        console.log(response);
        
      });
    }
  }

}
