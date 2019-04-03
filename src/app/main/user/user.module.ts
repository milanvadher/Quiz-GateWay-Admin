import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ListModule } from './list/list.module';
import { CreateComponent } from './dialog/create/create.component';
import { MatButtonModule, MatCheckboxModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule, MatMenuModule, MatRippleModule, MatSelectModule, MatToolbarModule } from '@angular/material';
import { FuseSharedModule } from '@fuse/shared.module';

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
    },
];

@NgModule({
    declarations: [
        CreateComponent
    ],
    imports: [
        CommonModule,

        MatButtonModule,
        MatCheckboxModule,
        MatDialogModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatRippleModule,
        MatSelectModule,
        MatToolbarModule,
        
        RouterModule.forChild(appRoutes),

        FuseSharedModule,
        
        ListModule
    ],
    entryComponents: [
        CreateComponent
    ]
})
export class UserModule { }
