import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FTableModule } from 'ftable';
import { SampleTableComponent } from './table/sampletable.component';

import { EmailFFilterComponent } from './table/emailffilter.component'

@NgModule({
  declarations: [
    AppComponent,
    SampleTableComponent,
    EmailFFilterComponent
  ],
  imports: [
    BrowserModule,
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



