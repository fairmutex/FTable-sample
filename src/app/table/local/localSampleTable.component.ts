import { Component } from '@angular/core';
import { HostListener } from '@angular/core';
import { FTable, FColumn, FSearch, FTableComponent, FTableLocalService } from 'ftable';
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
    public isSmallScreen: boolean;

public showExporter:boolean;
public showPager:boolean;
public showFilter:boolean;
public showSort:boolean;
public showSearch:boolean;


    constructor(_ftableService: FTableLocalService) {
        const d = data['default'] as any[];
        _ftableService.setLocalTableData(d);
        super(_ftableService);

        this.isSmallScreen = false;
        // Detect device
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) { 
            this.isSmallScreen = true;
        }

        // Column Titles
        const titles = ['Avatar', 'Name', 'Surname', 'Age', 'Email', 'Status', 'DOB', 'Actions'];
        // column Names ( for internal use and must match backend properties)
        const names = ['picture', 'name', 'surname', 'age', 'email', 'status', 'dateOfBirth', ''];

        const types = ['', 'string', 'string', 'number', 'string', 'checkbox', 'date', ''];  // data types
        // Filters to be used in the table. EmailFFilterComponent is a custom filter, the others are standard with FTables.
        this.filters = ['', 'string', 'string', 'number', EmailFFilterComponent, 'checkbox', 'date', ''];

        // display formatter

        var dateformatter = (d) => moment(d).format("DD-MMM-YYYY")
       //var emailFormatter = (d) => d.split('@')[0];
        const formats = [, , , , , , dateformatter,]  // Display formatters

        // TODO fix API
        this.table = new FTable();
        this.table.pageSizes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 20, 30, 40, 50, 60, 100, 150, 200];  // Page sizes

        if (this.isSmallScreen) { // Initial Page size index
            this.table.pageSizeIndex = 1;  
        } else {
            this.table.pageSizeIndex = 6;  
        }

        this.table.dataModifier.currentPage = 1;  // Starting page
        this.table.dataModifier.pageSize = this.table.pageSizes[this.table.pageSizeIndex];

        // Create Columns in the Table
        this.table.columns = [];
        for (let i = 0; i < titles.length; i++) {
            this.table.columns.push(new FColumn(titles[i], names[i], types[i], formats[i]));
        }


        this.table.dataModifier.orders = [];
        this.table.dataModifier.search = new FSearch('');

    }

    // This is to use width screen comensurate with the SCSS for Small devices
    ngAfterViewInit() {
        setTimeout(_ => {
            this.isSmallScreen = (window.innerWidth <= 760 ? true : false)
        });
    }

    @HostListener('window:resize', ['$event'])
    onResize(event) { 
        this.isSmallScreen = (window.innerWidth <= 760 ? true : false);
    }

    // Sample function changing value
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

    // Sample function edit value
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


    // sample function for delete
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
