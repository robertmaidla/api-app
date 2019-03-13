import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Row } from '../models/Row';
import { Set } from '../models/Set';


// const httpOptions = {
//   headers: new HttpHeaders({
//     'Content-Type': 'application/json'
//   })
// }

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  setsUrl:string = 'http://127.0.0.1:8000/datasets/';
  removeRowUrl:string = 'http://127.0.0.1:8000/remove-row/';
  rowsUrlExtension:string = 'rows';

  private countdownEndSource = new Subject<void>();
  public countdownEnd$ = this.countdownEndSource.asObservable();

  constructor(private http:HttpClient) { }

  // Get DataSets
  getDataSets():Observable<Set[]> {
    try {
      return this.http.get<Set[]>(this.setsUrl);
    } catch (e) {
      console.log(e);
    }
  }

  // Get Rows
  getRow(setId:string):Observable<Row[]> {
    try {
      return this.http.get<Row[]>(`${this.setsUrl}${setId}/${this.rowsUrlExtension}`);
    } catch (e) {
      console.log(e);
    }
  }

  // Remove reference to row in given dataset
  removeRow(setId:string, rowId:string):Observable<string> {
    try {
      return this.http.get<string>(`${this.removeRowUrl}${setId}/${rowId}/`);
    } catch (e) {
      console.log(e);
    }
  }


}
