import { Component, Input, Output, EventEmitter } from '@angular/core';
import { OnInit } from '@angular/core';


import { FFilterBase } from 'ftable';
@Component({
  template: `
  <div class="input-group input-group-sm mb-3">
  <input class="form-control input-sm" type='text' [(ngModel)]='first' (keyup)='text("first",$event)'/>
  </div>
  <div class="input-group input-group-sm">
  <div class="input-group-prepend">
    <span class="input-group-text" id="inputGroup-sizing-sm">@</span>
  </div>
  <input class="form-control input-sm" type='text' [(ngModel)]='second' (keyup)='text("second",$event)'/>
</div>
  `

  // <input class="form-control input-sm" type='text' (keyup)='text("first",$event)'/>@
  // <input class="form-control input-sm" type='text' (keyup)='text("second",$event)'/>
})
export class EmailFFilterComponent implements FFilterBase, OnInit {
  @Input() public source: string;
  @Input() public columnName: string;
  @Input() public otherData: any;

  @Output() filter: EventEmitter<any> = new EventEmitter<any>();

  // Hold Inputted Values
  private first: string;
  private second: string;

  ngOnInit() {
    this.first = '';
    this.second = '';
  }

  text(mode, event) {
    this[mode] = event.target.value;
    if (this.source === 'frontend') {
      const fn = function (name: string, first: string, second: string) {
        return d => {
          if (first.length > 0 && second.length > 0) {
            return (<any[]>d).filter(x => ((String(x[name].split('@')[0]).toLowerCase().indexOf(String(first).toLowerCase()) !== -1) &&
              (String(x[name].split('@')[1]).toLowerCase().indexOf(String(second).toLowerCase()) !== -1)));
          } else if (first.length > 0) {
            return (<any[]>d).filter(x => String(x[name].split('@')[0]).toLowerCase().indexOf(String(first).toLowerCase()) !== -1);
          } else if (second.length > 0) {
            return (<any[]>d).filter(x => String(x[name].split('@')[1]).toLowerCase().indexOf(String(second).toLowerCase()) !== -1);
          } else {
            return (<any[]>d);
          }
        };
      };
      this.filter.emit({ columnName: this.columnName, apply: fn(this.columnName, this.first, this.second) });
    } else {
      this.filter.emit({ columnName: this.columnName,type:'email', apply: { first: this.first, second: this.second } });
    }
  }



  reset() {
    this.first = '';
    this.second = ''
      const fn = d => { return (<any[]>d); };
      this.filter.emit({ columnName: this.columnName, apply: null });
    }
  
}
