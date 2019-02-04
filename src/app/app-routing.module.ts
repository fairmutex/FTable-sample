import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LocalSampleTableComponent } from './table/local/localSampleTable.component';
import {RemoteSampleTableComponent } from './table/remote/remoteSampleTable.component';

const routes: Routes = [

  { path: 'local',   component: LocalSampleTableComponent },
  { path: 'remote',   component: RemoteSampleTableComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
