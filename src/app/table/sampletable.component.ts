import { Component } from '@angular/core';
import { FTable, FColumn, FSearch, FOrder, FTableComponent, FTableService } from 'ftable';
import { EmailFFilterComponent } from './emailffilter.component';

import * as data from '../data/data.json';
import * as moment from 'moment';
// import { splitAtPeriod } from '@angular/compiler/src/util';


@Component({
    selector: 'app-table',
    templateUrl: './sampletable.component.html',
    styleUrls: ['./sampletable.component.scss']
})
export class SampleTableComponent extends FTableComponent {

  //  public table: FTable;

  public filters;
    constructor(_ftableService: FTableService) {
        _ftableService.data = data['default']  as any [];
        super(_ftableService);
       const titles = ['Name', 'Surname', 'Age', 'Email',  'Status', 'DOB', 'Actions'];
       const names = ['name', 'surname', 'age', 'email', 'status', 'dateOfBirth', ''];
       const types = ['string', 'string', 'number', 'string' , 'checkbox', 'date', ''];
        this.filters = ['string', 'string', 'number', EmailFFilterComponent , 'checkbox', 'date', ''];

        var dateformatter = (d) => moment(d).format("DD-MMM-YYYY")
        const formats = [,,,,,dateformatter,]
       


        this.table = new FTable();
        this.table.pageSizes   = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 20, 30, 40, 50, 60, 100, 150, 200];
        this.table.pageSizeIndex = 6;
        this.table.currentPage = 1;
        this.table.columns = [];



        for (let i = 0 ; i < titles.length; i++) {
            this.table.columns.push(new FColumn(titles[i], names[i], types[i],formats[i]));
        }

        this.table.orders = [];
        this.table.search = new FSearch('');
        this.table.totalRows = 0;
        this.table.filteredRows = 0;

            }



            flipStatus(idValue: any){

                var r = confirm("Are you sure?");
                if (r == true) {
                    var fn = function(d){
                        return (d ==='Enabled'? 'Disabled':'Enabled');
                    }
                    super.changeValue('id',idValue,'status',fn);
                } else {
                  //txt = "You pressed Cancel!";
                }



              
                // this.refreshPage();
            }

}
