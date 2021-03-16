import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TecateComponent } from './tecate.component';
import {NbButtonModule, NbCardModule, NbDatepickerModule, NbInputModule, NbSpinnerModule} from '@nebular/theme';
import {FormsModule} from '@angular/forms';
import {NgxEchartsModule} from 'ngx-echarts';
import {Ng2SmartTableModule} from 'ng2-smart-table';

@NgModule({
  declarations: [TecateComponent],
  imports: [
    CommonModule,
    NbCardModule,
    NbInputModule,
    NbDatepickerModule,
    FormsModule,
    NbButtonModule,
    NbSpinnerModule,
    NgxEchartsModule,
    Ng2SmartTableModule,
  ],
})
export class TecateModule { }
