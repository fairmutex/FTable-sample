import { Component } from '@angular/core';
import { FTable, FColumn, FSearch, FOrder, FTableComponent, FTableLocalService } from 'ftable';
import { EmailFFilterComponent } from '../customfilters/emailffilter.component';

import * as data from '../../data/data.json';
import * as moment from 'moment';


@Component({
    selector: 'app-table',
    templateUrl: './localSampleTable.component.html',
    styleUrls: ['./localSampleTable.component.scss']
})
export class LocalSampleTableComponent extends FTableComponent {


    public filters;
    constructor(_ftableService: FTableLocalService) {
        const d = data['default'] as any[];
        _ftableService.setLocalTableData(d);
        super(_ftableService);
        const titles = ['Name', 'Surname', 'Age', 'Email', 'Status', 'DOB', 'Actions'];  // column titles
        const names = ['name', 'surname', 'age', 'email', 'status', 'dateOfBirth', ''];  // column names ( internal )
        const types = ['string', 'string', 'number', 'string', 'checkbox', 'date', ''];  // data types
        this.filters = ['string', 'string', 'number', EmailFFilterComponent, 'checkbox', 'date', ''];  // Filters Standard/ Email custom demo

        // display formatter
        var dateformatter = (d) => moment(d).format("DD-MMM-YYYY")
        const formats = [, , , , , dateformatter,]  // Display formatters

        this.table = new FTable();
        this.table.pageSizes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 20, 30, 40, 50, 60, 100, 150, 200];  // Page sizes
        this.table.pageSizeIndex = 6;  // Initial Page size index
        this.table.dataModifier.currentPage = 1;  // Starting page
        this.table.dataModifier.pageSize = this.table.pageSizes[this.table.pageSizeIndex];

        // column Data
        this.table.columns = [];
        for (let i = 0; i < titles.length; i++) {
            this.table.columns.push(new FColumn(titles[i], names[i], types[i], formats[i]));
        }
      

        this.table.dataModifier.orders = [];
        this.table.dataModifier.search = new FSearch('');
    }

    flipStatus(id: any) {

        var r = confirm("Are you sure?");
        if (r == true) {
            var fn = function (d) {
                return (d === 'Enabled' ? 'Disabled' : 'Enabled');
            }
            super.changeValue(id, 'status', fn);
        } else {
        }
    }


    edit(id: any, columnName: string) {
        this._ftableService.get(id)
            .subscribe(
                (result) => {
                    var value = prompt("Edit: " + this.table.columns.find(x => x.name === columnName).title, result[columnName]);
                    if (value == null || value == "") {
                        //txt = "User cancelled the prompt.";
                    } else {
                        // TODO fix for local/remote same
                        var fn = function (d) {
                            return value;
                        }
                        this.changeValue(id, columnName, fn);
                    }
                }, error => {
                    console.log("Error", error);
                });
    }


    // delete(id: any) {
    //     var r = confirm("Are you sure you want to delete?");
    //     if (r == true) {
    //         this._ftableService.delete(id)
    //             .subscribe(
    //                 (result) => {
    //                     this.refreshPage();
    //                     alert('Deleted!')
    //                 }, error => {
    //                     console.log("Error", error);
    //                 });
    //     }
    //     else {
    //     }

    // }
}
