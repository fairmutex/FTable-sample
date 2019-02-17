import { Component } from '@angular/core';
import { HostListener } from '@angular/core';
import { FTable, FColumn, FSearch, FTableComponent, FTableAPIService } from 'ftable';
import { HttpHeaders } from '@angular/common/http';
// import { AuthenticationService } from '../../core/authentication/authentication.service';


import { EmailFFilterComponent } from '../customfilters/emailffilter.component';

import * as moment from 'moment';


@Component({
    selector: 'app-table',
    templateUrl: './remoteSampleTable.component.html',
    styleUrls: ['./remoteSampleTable.component.scss']
})
export class RemoteSampleTableComponent extends FTableComponent {

    //  public table: FTable;

    public filters;
    public isSmallScreen: boolean;

    public showExporter:boolean;
    public showPager:boolean;
    public showFilter:boolean;
    public showSort:boolean;
    public showSearch:boolean;

    constructor(_ftableService: FTableAPIService) {

        // Remote Data
        let httpHeaders = new HttpHeaders({
            'content-Type': 'application/json; charset=utf-8',
            'Accept': 'application/json',

        });

        _ftableService.setAPIConfig('https://localhost:44333/api/v1/Sample/', httpHeaders);

        super(_ftableService);

        this.isSmallScreen = false;
        // Detect device
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) { 
            this.isSmallScreen = true;
        }

        // Column Titles
        const titles = ['Avatar','Name', 'Surname', 'Age', 'Email', 'Status', 'DOB', 'Actions'];  
        // column Names ( for internal use and must match backend properties)
        const names = ['picture','name', 'surname', 'age', 'email', 'status', 'dateOfBirth', '']; 

        const types = ['', 'string', 'string', 'number', 'string', 'checkbox', 'date', ''];  // data types
        // Filters to be used in the table. EmailFFilterComponent is a custom filter, the others are standard with FTables.
        this.filters = ['','string', 'string', 'number', EmailFFilterComponent, 'checkbox', 'date', ''];  

        // display formatter
        var dateformatter = (d) => moment(d).format("DD-MMM-YYYY")
        const formats = [,, , , , , dateformatter,]



        this.table = new FTable();
        this.table.pageSizes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 20, 30, 40, 50, 60, 100, 150, 200];

        if (this.isSmallScreen) { // Initial Page size index
            this.table.pageSizeIndex = 1;  
        } else {
            this.table.pageSizeIndex = 6;  
        }

        this.table.dataModifier.currentPage = 1;
        this.table.dataModifier.pageSize = this.table.pageSizes[this.table.pageSizeIndex];
        this.table.columns = [];

        for (let i = 0; i < titles.length; i++) {
            this.table.columns.push(new FColumn(titles[i], names[i], types[i], formats[i]));
        }

        // since data is remote these need to be set
        this.table.columns[5].filterData = ['Enabled','Disabled'];

        this.table.dataModifier.orders = [];
        this.table.dataModifier.search = new FSearch('');
    }


    
    //This is to use width screen comensurate with the SCSS for Small devices
    ngAfterViewInit() {
        setTimeout(_ => this.isSmallScreen = (window.innerWidth <= 1024 ? true : false));
    }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        console.log(1);
        this.isSmallScreen = (window.innerWidth <= 1024 ? true : false);
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
