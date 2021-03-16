import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MexicaliComponent } from './mexicali.component';
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
  declarations: [MexicaliComponent],
  imports: [
    CommonModule,
    NbCardModule,
    FormsModule,
    NbInputModule,
    NbSelectModule,
    NbButtonModule,
    NbSpinnerModule,
    Ng2SmartTableModule,
    NbDatepickerModule,
    NgxEchartsModule,
  ],
})
export class MexicaliModule { }
