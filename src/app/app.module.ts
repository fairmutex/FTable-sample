import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FTableModule } from 'ftable';
import { SampleTableComponent } from './table/sampletable.component';

import { EmailFFilterComponent } from './table/emailffilter.component';

@NgModule({
  declarations: [
    AppComponent,
    SampleTableComponent,
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



