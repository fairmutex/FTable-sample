import { Component } from '@angular/core';
import { FTable, FColumn, FSearch, FOrder, FTableComponent, FTableLocalService } from 'ftable';
import { EmailFFilterComponent } from './emailffilter.component';

import * as data from '../data/data.json';
import * as moment from 'moment';


@Component({
    selector: 'app-table',
    templateUrl: './sampletable.component.html',
    styleUrls: ['./sampletable.component.scss']
})
export class SampleTableComponent extends FTableComponent {


    public filters;
    constructor(_ftableService: FTableLocalService) {
        const d = data['default'] as any[];
        _ftableService.setLocalTableData(d);
        super(_ftableService);
        const titles = ['Name', 'Surname', 'Age', 'Email', 'Status', 'DOB', 'Actions'];  // column titles
        const names = ['name', 'surname', 'age', 'email', 'status', 'dateOfBirth', ''];  // column names ( internal )
        const types = ['string', 'string', 'number', 'string', 'checkbox', 'date', ''];  // data types
        this.filters = ['string', 'string', 'number', EmailFFilterComponent, 'checkbox', 'date', ''];  // Filters Standard/ Email custom demo

        var dateformatter = (d) => moment(d).format("DD-MMM-YYYY")
        const formats = [, , , , , dateformatter,]  // Display formatters

        this.table = new FTable();
        this.table.pageSizes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 20, 30, 40, 50, 60, 100, 150, 200];  // Page sizes
        this.table.pageSizeIndex = 6;  // Initial Page size index
        this.table.currentPage = 1;  // Starting page

        // column Data
        this.table.columns = [];   
        for (let i = 0; i < titles.length; i++) {
            this.table.columns.push(new FColumn(titles[i], names[i], types[i], formats[i]));
        }

        this.table.orders = [];
        this.table.search = new FSearch('');
        this.table.totalRows = 0;
        this.table.filteredRows = 0;
    }

    flipStatus(idValue: any) {

        var r = confirm("Are you sure?");
        if (r == true) {
            var fn = function (d) {
                return (d === 'Enabled' ? 'Disabled' : 'Enabled');
            }
            super.changeValue('id', idValue, 'status', fn);
        } else {
        }
    }

    edit(idValue: any, columnName: string) {
        var value = prompt("Edit: " + this.table.columns.find(x => x.name === columnName).title, this._ftableService.data.find(x => x.id === idValue)[columnName]);
        if (value == null || value == "") {
        } else {
            var fn = function (d) {
                return value;
            }
            this.changeValue('id', idValue, columnName, fn);
        }

    }


}
