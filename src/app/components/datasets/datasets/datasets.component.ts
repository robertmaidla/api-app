import { Component, OnInit } from '@angular/core';

import { DataServiceService } from 'src/app/services/data-service.service';
import { Set } from 'src/app/models/Set';
import { Row } from 'src/app/models/Row';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-datasets',
  templateUrl: './datasets.component.html',
  styleUrls: ['./datasets.component.scss']
})
export class DatasetsComponent implements OnInit {
  sets:Set[];
  activeSet:Set;
  activeRows:Row[];
  error:string;

  constructor(private dataService:DataServiceService) { }

  ngOnInit() {
    this.refreshUI();
  }

  // Show/hide DataSet detail
  toggleActiveSet(set:Set):void {
    try {
      if (this.activeSet === set) { // If set already selected, set to null (to hide rows)
        this.activeSet = null;
      } else { 
        this.activeSet = set;
        this.renderRows(set.id);
      }
    } catch(e) {
      this.handleError(e);
    }
  }

  // Fetch rows from server
  renderRows(id:string):void {
    try {
      this.dataService.getRow(id)
        .subscribe(
          returns =>  this.activeRows = returns,
          err => this.handleError('Error loading DataRows', err)
        );
    } catch (e) {
      this.handleError(e);
    }
  }

  // Delete reference to row in activeSet
  deleteRow(row:Row):void {
    try {
      // Subscribe to delete via service
      this.dataService.removeRow(this.activeSet.id, row.id)
        .subscribe(
          returns => {
            // Reload activeRows on complete
            this.renderRows(this.activeSet.id);
          },
          err => this.handleError('Error deleting rows', err)
        );
    } catch (e) {
      this.handleError(e);
    }
  }

  // Handle error for UI
  handleError(msg:string, error?:HttpErrorResponse):void {
    if (error) { // Print Http error
      console.log(error);
      this.error = `${msg}: ${error.statusText}`;
    } else { // Print any other errors
      console.log(msg);
    }
  }

  // Refresh UI
  refreshUI() {
    try {
      this.dataService.getDataSets()
        .subscribe(
          returns => this.sets = returns,
          err => this.handleError('Error loading DataSets', err)
        );
    } catch (e) {
      this.handleError(e);
    }
  }
}
