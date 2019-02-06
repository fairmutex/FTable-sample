import { Component, Input, Output, EventEmitter } from '@angular/core';
import { OnInit } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';

import { FFilterBase } from 'ftable';
@Component({
  template: `
  <div class="input-group input-group-sm mb-3">
  <input class="form-control input-sm" type='text' [(ngModel)]='localPart' (keyup)='text("localPart",$event)' #localPartRef />
  </div>
  <div class="input-group input-group-sm">
  <div class="input-group-prepend">
    <span class="input-group-text" id="inputGroup-sizing-sm">@</span>
  </div>
  <input class="form-control input-sm" type='text' [(ngModel)]='domain' (keyup)='text("domain",$event)' #domainRef />
</div>
  `
})
export class EmailFFilterComponent implements FFilterBase, OnInit {
  @ViewChild("localPartRef") _elLocalPartRef: ElementRef;
  @ViewChild("domainRef") _elDomainRef: ElementRef;

  @Input() public source: string;
  @Input() public columnName: string;
  @Input() public otherData: any;

  @Output() filter: EventEmitter<any> = new EventEmitter<any>();

  // Hold Inputted Values
  private localPart: string;
  private domain: string;

  ngOnInit() {
    this.localPart = '';
    this.domain = '';
  }

  text(mode, event) {
    if (event.keyCode !== 8 && event.keyCode !== 46) {
      this[mode] = event.target.value;

      // Move focus for UX
      if (mode === 'localPart' && event.keyCode === 39) {
        this._elDomainRef.nativeElement.focus();
      }
      else if (mode === 'domain' && event.keyCode === 39) {
        this._elLocalPartRef.nativeElement.focus();
      }
    }
    if (this.source === 'frontend') {
      const fn = function (name: string, localPart: string, domain: string) {
        return d => {
          if (localPart.length > 0 && domain.length > 0) {
            return (<any[]>d).filter(x => ((String(x[name].split('@')[0]).toLowerCase().indexOf(String(localPart).toLowerCase()) !== -1) &&
              (String(x[name].split('@')[1]).toLowerCase().indexOf(String(domain).toLowerCase()) !== -1)));
          } else if (localPart.length > 0) {
            return (<any[]>d).filter(x => String(x[name].split('@')[0]).toLowerCase().indexOf(String(localPart).toLowerCase()) !== -1);
          } else if (domain.length > 0) {
            return (<any[]>d).filter(x => String(x[name].split('@')[1]).toLowerCase().indexOf(String(domain).toLowerCase()) !== -1);
          } else {
            return (<any[]>d);
          }
        };
      };
      this.filter.emit({ columnName: this.columnName, apply: fn(this.columnName, this.localPart, this.domain) });
    } else {
      this.filter.emit({ columnName: this.columnName, type: 'email', apply: { localPart: this.localPart, domain: this.domain } });
    }

  }



  reset() {
    this.localPart = '';
    this.domain = ''
    const fn = d => { return (<any[]>d); };
    this.filter.emit({ columnName: this.columnName, apply: null });
  }

}
