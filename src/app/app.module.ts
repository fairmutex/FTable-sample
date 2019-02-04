import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FTableModule } from 'ftable';
import {LocalSampleTableComponent } from './table/local/localSampleTable.component';
import {RemoteSampleTableComponent } from './table/remote/remoteSampleTable.component';

import { EmailFFilterComponent } from './table/customfilters/emailffilter.component';

@NgModule({
  declarations: [
    AppComponent,
    LocalSampleTableComponent,
    RemoteSampleTableComponent,
    EmailFFilterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    FTableModule
  ],
  entryComponents: [
    EmailFFilterComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }



