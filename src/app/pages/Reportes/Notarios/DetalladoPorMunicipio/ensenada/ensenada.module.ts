import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnsenadaComponent } from './ensenada.component';
import {NbButtonModule, NbCardModule, NbDatepickerModule, NbInputModule, NbSpinnerModule} from '@nebular/theme';
import {FormsModule} from '@angular/forms';
import {NgxEchartsModule} from 'ngx-echarts';
import {Ng2SmartTableModule} from 'ng2-smart-table';



@NgModule({
  declarations: [EnsenadaComponent],
  imports: [
    CommonModule,
    NbCardModule,
    NbDatepickerModule,
    NbInputModule,
    FormsModule,
    NbButtonModule,
    NbSpinnerModule,
    NgxEchartsModule,
    Ng2SmartTableModule,
  ],
})
export class EnsenadaModule { }
