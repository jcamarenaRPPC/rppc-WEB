import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TijuanaComponent } from './tijuana.component';
import {NbButtonModule, NbCardModule, NbDatepickerModule, NbInputModule, NbSpinnerModule} from '@nebular/theme';
import {FormsModule} from '@angular/forms';
import {NgxEchartsModule} from 'ngx-echarts';
import {Ng2SmartTableModule} from 'ng2-smart-table';



@NgModule({
  declarations: [TijuanaComponent],
  imports: [
    CommonModule,
    NbCardModule,
    NbDatepickerModule,
    FormsModule,
    NbInputModule,
    NbButtonModule,
    NbSpinnerModule,
    NgxEchartsModule,
    Ng2SmartTableModule,
  ],
})
export class TijuanaModule { }
