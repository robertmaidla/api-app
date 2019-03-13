import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  inputName:string;
  selectedFile:File = null;
  feedback:string;

  url:string = 'http://127.0.0.1:8000/datasets/generate/';
  fd:FormData;

  constructor(private http:HttpClient) { }

  ngOnInit() {
  }
  
  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
  }

  onUpload() {
    this.fd = new FormData();
    this.fd.append('file', this.selectedFile, this.selectedFile.name);
    fd.append('DatasetName', this.inputName);
    this.http.post(this.url, this.fd, {
        reportProgress: true,
        observe: 'events'    
      })
        .subscribe(event => {
          if (event.type === HttpEventType.UploadProgress) {
            this.feedback = `${Math.round(event.loaded / event.total * 100)}%`;
          } else if (event.type === HttpEventType.Response) {
            console.log("LOGGING")
            console.log(event);
          }
          //Response message
          //Reload UI
          this.inputName = null;
          this.selectedFile = null;
        });
  }

}
