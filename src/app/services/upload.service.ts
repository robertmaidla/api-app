import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  url:string = 'http://127.0.0.1:8000/datasets/generate/';
  fd:FormData;
  
  constructor(private http:HttpClient) { }

  uploadEntry(inputName:string, selectedFile:File):Observable<Object> {
    this.fd = new FormData();
    this.fd.append('file', selectedFile, selectedFile.name);
    // fd.append('DatasetName', this.inputName);
    return this.http.post(this.url, this.fd);
  }
}