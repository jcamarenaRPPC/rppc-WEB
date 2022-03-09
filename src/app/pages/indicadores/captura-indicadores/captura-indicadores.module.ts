import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NbButtonModule,
  NbCardModule,
  NbDatepickerModule,
  NbInputModule,
  NbSelectModule,
  NbSpinnerModule,
} from '@nebular/theme';
import {FormsModule} from '@angular/forms';
import {NgxEchartsModule} from 'ngx-echarts';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import { AllowNumberDirective } from './allow-number.directive';

@NgModule({
  imports: [
    CommonModule,
    NbCardModule,
    NbDatepickerModule,
    FormsModule,
    NgxEchartsModule,
    NbSpinnerModule,
    Ng2SmartTableModule,
    NbButtonModule,
    NbInputModule,
    NbSelectModule,
  ],
  declarations: [AllowNumberDirective],
  exports: [
    AllowNumberDirective,
  ],
})
export class CapturaIndicadoresModule { }
