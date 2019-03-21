import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list.component';
import { RouterModule, Routes } from '@angular/router';
import { AgGridModule } from 'ag-grid-angular';

const routes: Routes = [
    {
        path: 'list',
        component: ListComponent
    }
];

@NgModule({
    imports: [
        CommonModule,

        RouterModule.forChild(routes),

        AgGridModule.withComponents([]),

    ],
    declarations: [
        ListComponent
    ]
})
export class ListModule { }
