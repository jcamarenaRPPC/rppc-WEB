import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrTotalizadoComponent } from './crTotalizado.component';
import {
  NbButtonModule,
  NbCardModule,
  NbDatepickerModule,
  NbInputModule,
  NbSpinnerModule,
  NbTabsetModule,
} from '@nebular/theme';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {FormsModule} from '@angular/forms';
import {NgxEchartsModule} from 'ngx-echarts';



@NgModule({
  declarations: [CrTotalizadoComponent],
    imports: [
        CommonModule,
        NbCardModule,
        Ng2SmartTableModule,
        NbSpinnerModule,
        NbButtonModule,
        NbTabsetModule,
        NbDatepickerModule,
        FormsModule,
        NbInputModule,
        NgxEchartsModule,
    ],
})
export class CrTotalizadoModule { }
