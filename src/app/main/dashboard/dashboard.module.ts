import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { Routes, RouterModule } from '@angular/router';
import { AgmCoreModule } from '@agm/core';
import { ChartsModule } from 'ng2-charts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';
import { MatButtonModule, MatFormFieldModule, MatIconModule, MatMenuModule, MatSelectModule, MatTabsModule } from '@angular/material';
import { DashboardService } from './dashboard.service';
import { AuthGuard } from 'app/guard/auth.guard';

const routes: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard]
    }
];

@NgModule({
    imports: [
        CommonModule,

        RouterModule.forChild(routes),

        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatMenuModule,
        MatSelectModule,
        MatTabsModule,

        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyDfb_cNe3RouBsU5gLs6r6yJAIOyoP81Sk'
        }),
        ChartsModule,
        NgxChartsModule,

        FuseSharedModule,
        FuseWidgetModule
    ],
    declarations: [
        DashboardComponent
    ],
    exports: [
        DashboardComponent
    ],
    providers: [
        DashboardService
    ]
})
export class DashboardModule { }
