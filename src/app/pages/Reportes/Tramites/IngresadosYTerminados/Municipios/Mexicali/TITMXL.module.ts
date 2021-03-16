import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TITMXLComponent } from './TITMXL.component';
import {NbButtonModule, NbCardModule, NbDatepickerModule, NbInputModule, NbSpinnerModule} from '@nebular/theme';
import {FormsModule} from '@angular/forms';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {NgxEchartsModule} from 'ngx-echarts';



@NgModule({
  declarations: [TITMXLComponent],
    imports: [
        CommonModule,
        NbCardModule,
        NbDatepickerModule,
        FormsModule,
        NbSpinnerModule,
        Ng2SmartTableModule,
        NbInputModule,
        NbButtonModule,
        NgxEchartsModule,
    ],
})
export class TITMXLModule { }
