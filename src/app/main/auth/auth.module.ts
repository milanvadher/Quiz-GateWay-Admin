import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginModule } from './login/login.module';
import { RouterModule, Routes } from '@angular/router';
import { RegisterModule } from './register/register.module';

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(appRoutes),
        LoginModule,
        RegisterModule
    ],
})
export class AuthModule { }
