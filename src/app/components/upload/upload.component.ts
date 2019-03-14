import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  @Output() refreshUI: EventEmitter<any> = new EventEmitter();
  @Output() handleError: EventEmitter<any> = new EventEmitter();

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

  // On file upload
  onUpload() {
    try {
      this.fd = new FormData();
      this.fd.append('file', this.selectedFile, this.selectedFile.name);
      this.http.post(this.url, this.fd, {
          reportProgress: true,
          observe: 'events'    
        })
          .subscribe(
            event => {
              if (event.type === HttpEventType.UploadProgress) {
                // UI upload progress feature
              } 
              else if (event.type === HttpEventType.Response) {
                const res:boolean = event.ok;
                if (res) {
                  // Reload UI
                  this.refreshUI.emit();
                } else {
                  this.handleError.emit(event.body);
                }
                //Clear UI form
                this.selectedFile = null;
              }
            },
            err => this.handleError.emit(err)
          );
    } catch(e) {
      console.log(e);
      this.handleError.emit(e);
      this.selectedFile = null;
    }
  }

}
