import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ListModule } from './list/list.module';

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [
        CommonModule,
        
        RouterModule.forChild(appRoutes),
        
        ListModule
    ],
})
export class UserModule { }
