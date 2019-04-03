import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list.component';
import { RouterModule, Routes } from '@angular/router';
import { AgGridModule } from 'ag-grid-angular';
import { MatButtonModule, MatChipsModule, MatFormFieldModule, MatIconModule, MatInputModule, MatPaginatorModule, MatRippleModule, MatSelectModule, MatSnackBarModule, MatSortModule, MatTableModule, MatTabsModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';

const routes: Routes = [
    {
        path: 'list',
        component: ListComponent
    }
];

@NgModule({
    imports: [
        CommonModule,

        MatButtonModule,
        MatChipsModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatPaginatorModule,
        MatRippleModule,
        MatSelectModule,
        MatSortModule,
        MatSnackBarModule,
        MatTableModule,
        MatTabsModule,

        RouterModule.forChild(routes),

        AgGridModule.withComponents([]),

        FuseSharedModule,
        FuseWidgetModule,

    ],
    declarations: [
        ListComponent
    ]
})
export class ListModule { }
