import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent {
  file: File | undefined;

  constructor(private http: HttpClient){}

  onFileSelected(event: any){
    this.file = event.target.files[0];

  }

  onUpload(){
    if(this.file){
      const formData = new FormData();
      formData.append('file', this.file);
      this.http.post('http://127.0.0.1:3000/api/upload', formData).subscribe(response => {
        console.log(response);
      });
    }
  }

}
