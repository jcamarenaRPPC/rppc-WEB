import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VaPendientesTECComponent } from '../Tecate/vaPendientesTEC.component';
import {
  NbButtonModule,
  NbCardModule,
  NbDatepickerModule,
  NbInputModule,
  NbSpinnerModule,
  NbTabsetModule, NbTooltipModule,
} from '@nebular/theme';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {FormsModule} from '@angular/forms';
import {NgxEchartsModule} from 'ngx-echarts';

@NgModule({
  declarations: [VaPendientesTECComponent],
    imports: [
        CommonModule,
        NbCardModule,
        NbTabsetModule,
        NbSpinnerModule,
        Ng2SmartTableModule,
        NbButtonModule,
        NbDatepickerModule,
        FormsModule,
        NbInputModule,
        NbTooltipModule,
        NgxEchartsModule,
    ],
})
export class VaPendientesTIJModule { }
