import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TITTECComponent } from './TITTEC.component';
import {NbButtonModule, NbCardModule, NbDatepickerModule, NbInputModule, NbSpinnerModule} from '@nebular/theme';
import {FormsModule} from '@angular/forms';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {NgxEchartsModule} from 'ngx-echarts';



@NgModule({
  declarations: [TITTECComponent],
    imports: [
        CommonModule,
        NbCardModule,
        NbInputModule,
        NbDatepickerModule,
        FormsModule,
        NbSpinnerModule,
        Ng2SmartTableModule,
        NbButtonModule,
        NgxEchartsModule,
    ],
})
export class TITTECModule { }
