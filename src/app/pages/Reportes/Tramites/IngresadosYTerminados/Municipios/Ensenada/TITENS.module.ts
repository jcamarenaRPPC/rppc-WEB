import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TITENSComponent } from './TITENS.component';
import {NbButtonModule, NbCardModule, NbDatepickerModule, NbInputModule, NbSpinnerModule} from '@nebular/theme';
import {FormsModule} from '@angular/forms';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {NgxEchartsModule} from 'ngx-echarts';



@NgModule({
  declarations: [TITENSComponent],
    imports: [
        CommonModule,
        NbCardModule,
        NbDatepickerModule,
        NbInputModule,
        FormsModule,
        NbSpinnerModule,
        Ng2SmartTableModule,
        NbButtonModule,
        NgxEchartsModule,
    ],
})
export class TITENSModule { }
