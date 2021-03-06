import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

import { Set } from 'src/app/models/Set';

@Component({
  selector: 'app-set-item',
  templateUrl: './set-item.component.html',
  styleUrls: ['./set-item.component.scss']
})
export class SetItemComponent implements OnInit {
  @Input() set:Set;
  @Input() isActive:boolean;
  @Output() toggleActiveSet:EventEmitter<Set> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  activateSet(set:Set):void {
    this.toggleActiveSet.emit(set);
  }

  // Dynamic ngClass classes
  setDynamicClasses(set:Set):any {
    return {
      'set-item': !this.isActive,
      'active-set-item': this.isActive
    }
  }

}
