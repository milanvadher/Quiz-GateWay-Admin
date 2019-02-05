import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Error404Module } from './404/error-404.module';
import { Error500Module } from './500/error-500.module';

@NgModule({
  imports: [
    CommonModule,

    Error404Module,
    Error500Module
  ],
})
export class ErrorsModule { }
