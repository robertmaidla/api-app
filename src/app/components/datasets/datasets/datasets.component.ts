import { Component, OnInit } from '@angular/core';

import { DataServiceService } from 'src/app/services/data-service.service';
import { Set } from 'src/app/models/Set';
import { Row } from 'src/app/models/Row';


@Component({
  selector: 'app-datasets',
  templateUrl: './datasets.component.html',
  styleUrls: ['./datasets.component.scss']
})
export class DatasetsComponent implements OnInit {
  sets:Set[];
  activeSet:Set;
  activeRows:Row[];

  constructor(private dataService:DataServiceService) { }

  ngOnInit() {
    this.dataService.getDataSets().subscribe(returns => {
      this.sets = returns;
    });
  }

  toggleActiveSet(set:Set):void {
    // If set already selected, set to null (to hide rows)
    if (this.activeSet === set) {
      this.activeSet = null;
    } else {
      this.activeSet = set;
      this.renderRows(set.id);
    }
  }

  // Fetch 'Row' values from server
  renderRows(id:string):void {
    this.dataService.getRow(id).subscribe(returns => {
      this.activeRows = returns;
    })
  }

  // Delete reference to row in activeSet
  deleteRow(row:Row):void {
    // Subscribe to delete via service
    this.dataService.removeRow(this.activeSet.id, row.id).subscribe(returns => {
      // Reload activeRows on complete
      this.renderRows(this.activeSet.id);
    })
  }

}
