import { NgModule } from '@angular/core';

import { VerticalLayout1Module } from 'app/layout/vertical/layout-1/layout-1.module';
import { HorizontalLayout1Module } from './horizontal/layout-1/layout-1.module';


@NgModule({
    imports: [
        VerticalLayout1Module,
        
        HorizontalLayout1Module
    ],
    exports: [
        VerticalLayout1Module,

        HorizontalLayout1Module
    ]
})
export class LayoutModule
{
}
