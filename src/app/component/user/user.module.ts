import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { ListComponent } from './list/list.component';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    AgGridModule.withComponents(null)
  ],
  declarations: [ListComponent]
})
export class UserModule { }
