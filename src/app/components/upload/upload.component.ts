import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  selectedFile:File = null;

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }
  
  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
  }

  onUpload() {
    const url = 'http://127.0.0.1:8000/datasets/generate/';
    const fd = new FormData();
    fd.append('file', this.selectedFile, this.selectedFile.name);
    this.http.post(url, fd, {
      reportProgress: true,
      observe: 'events'
    })
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          console.log(`Upload Progress: ${Math.round(event.loaded / event.total * 100)}%`);
        } else if (event.type === HttpEventType.Response) {
          console.log(event);
        }
      })
  }

}
