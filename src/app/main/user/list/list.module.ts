import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list.component';
import { RouterModule, Routes } from '@angular/router';
import { MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule } from '@angular/material';
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

        MatFormFieldModule,
        MatInputModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule

    ],
    declarations: [
        ListComponent
    ]
})
export class ListModule { }
