import { NgModule } from '@angular/core';
import {
    NbButtonModule,
    NbCardModule,
    NbDatepickerModule,
    NbInputModule,
    NbLayoutModule,
    NbSpinnerModule, NbToggleModule, NbTooltipModule,
} from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import {PieChartModule} from '@swimlane/ngx-charts';
import {NgxEchartsModule} from 'ngx-echarts';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
    imports: [
        NbCardModule,
        ThemeModule,
        NbLayoutModule,
        PieChartModule,
        NgxEchartsModule,
        NbInputModule,
        NbDatepickerModule,
        FormsModule,
        NbButtonModule,
        NbSpinnerModule,
        NbToggleModule,
        ReactiveFormsModule,
        NbTooltipModule,
    ],
  declarations: [
    DashboardComponent,
  ],
})
export class DashboardModule { }
