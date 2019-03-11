import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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


  constructor(private http:HttpClient) { }

  // Get DataSets
  getDataSets():Observable<Set[]> {
    return this.http.get<Set[]>(this.setsUrl);
  }

  // Get Rows
  getRow(setId:string):Observable<Row[]> {
    return this.http.get<Row[]>(`${this.setsUrl}${setId}/rows`);
  }

  // Remove reference to row in given dataset
  removeRow(setId:string, rowId:string):Observable<string> {
    return this.http.get<string>(`${this.removeRowUrl}${setId}/${rowId}`);
  }


}
