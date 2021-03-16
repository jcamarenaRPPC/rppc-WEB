import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetalladoPorEstadoComponent } from './DetalladoPorEstado.component';
import {
    NbButtonModule,
    NbCardModule,
    NbDatepickerModule,
    NbInputModule,
    NbSelectModule,
    NbSpinnerModule,
} from '@nebular/theme';
import {FormsModule} from '@angular/forms';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {NgxEchartsModule} from 'ngx-echarts';



@NgModule({
  declarations: [DetalladoPorEstadoComponent],
  imports: [
    CommonModule,
    NbCardModule,
    NbInputModule,
    FormsModule,
    NbSelectModule,
    NbButtonModule,
    NbSpinnerModule,
    Ng2SmartTableModule,
    NbDatepickerModule,
    NgxEchartsModule,
  ],
})
export class DetalladoPorEstadoModule { }
