import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RosaritoComponent } from './rosarito.component';
import {NbButtonModule, NbCardModule, NbDatepickerModule, NbInputModule, NbSpinnerModule} from '@nebular/theme';
import {FormsModule} from '@angular/forms';
import {NgxEchartsModule} from 'ngx-echarts';
import {Ng2SmartTableModule} from 'ng2-smart-table';



@NgModule({
  declarations: [RosaritoComponent],
  imports: [
    CommonModule,
    NbCardModule,
    NbDatepickerModule,
    FormsModule,
    NbSpinnerModule,
    NgxEchartsModule,
    NbInputModule,
    NbButtonModule,
    Ng2SmartTableModule,
  ],
})
export class RosaritoModule { }
