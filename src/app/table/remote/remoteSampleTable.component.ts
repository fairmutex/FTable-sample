import { Component } from '@angular/core';
import { FTable, FColumn, FSearch, FOrder, FTableComponent, FTableAPIService } from 'ftable';
import { HttpHeaders } from '@angular/common/http';
// '../../ftable/ftable.model';
// import { AuthenticationService } from '../../core/authentication/authentication.service';
// import { KeysFilterPipe } from '../shared/pipes/Keys-filter.pipe';
// import {FTable} from '../../FTable/ftable.model';

import { EmailFFilterComponent } from '../customfilters/emailffilter.component';

import * as data from '../../data/data.json';
import * as moment from 'moment';
// import { splitAtPeriod } from '@angular/compiler/src/util';


@Component({
    selector: 'app-table',
    templateUrl: './remoteSampleTable.component.html',
    styleUrls: ['./remoteSampleTable.component.scss']
})
export class RemoteSampleTableComponent extends FTableComponent {

    //  public table: FTable;

    public filters;
    constructor(_ftableService: FTableAPIService) {

        // Remote Data
        let httpHeaders = new HttpHeaders({
            'content-Type': 'application/json; charset=utf-8',
            'Accept': 'application/json',

        });

        _ftableService.setAPIConfig('https://localhost:44333/api/v1/Sample/', httpHeaders);

        super(_ftableService);
        const titles = ['Name', 'Surname', 'Age', 'Email', 'Status', 'DOB', 'Actions'];
        const names = ['name', 'surname', 'age', 'email', 'status', 'dateOfBirth', ''];
        const types = ['string', 'string', 'number', 'string', 'checkbox', 'date', ''];
        this.filters = ['string', 'string', 'number', EmailFFilterComponent, 'checkbox', 'date', ''];

        // display formatter
        var dateformatter = (d) => moment(d).format("DD-MMM-YYYY")
        const formats = [, , , , , dateformatter,]



        this.table = new FTable();
        this.table.pageSizes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 20, 30, 40, 50, 60, 100, 150, 200];
        this.table.pageSizeIndex = 6;
        this.table.dataModifier.currentPage = 1;
        this.table.dataModifier.pageSize = this.table.pageSizes[this.table.pageSizeIndex];
        this.table.columns = [];

        for (let i = 0; i < titles.length; i++) {
            this.table.columns.push(new FColumn(titles[i], names[i], types[i], formats[i]));
        }

        // since data is remote these need to be set
        this.table.columns[4].filterData = ['Enabled','Disabled'];

        this.table.dataModifier.orders = [];
        this.table.dataModifier.search = new FSearch('');
        // this.table.search.isInverse = false;
        // this.table.search.isRegex = false;
        //  this.table.search.value = '';
        // this.table.totalRows = 0;
        // this.table.filteredRows = 0;
    }



    flipStatus(id: any, value: any) {

        var r = confirm("Are you sure?");
        if (r == true) {
            var fn = function (d) {
                return (d === 'Enabled' ? 'Disabled' : 'Enabled');
            }
            this.table.result
            this.changeValue(id, 'status', fn(value));
        } else {
            // User pressed Cancel!
        }

    }


    edit(id: any, columnName: string) {
        this._ftableService.get(id)
            .subscribe(
                (result) => {
                    var value = prompt("Edit: " + this.table.columns.find(x => x.name === columnName).title, result[columnName]);
                    if (value == null || value == "") {
                        // User cancelled the prompt
                    } else {
                        this.changeValue( id, columnName, String(value));
                    }
                }, error => {
                    console.log("Error", error);
                });
    }


    delete(id: any) {
        var r = confirm("Are you sure you want to delete?");
        if (r == true) {
            this._ftableService.delete(id)
                .subscribe(
                    (result) => {
                        this.refreshPage();
                        alert('Deleted!')
                    }, error => {
                        console.log("Error", error);
                    });
        } else {

        }
    }




}
