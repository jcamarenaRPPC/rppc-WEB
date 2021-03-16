import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TITTIJComponent } from './TITTIJ.component';
import {NbButtonModule, NbCardModule, NbDatepickerModule, NbInputModule, NbSpinnerModule} from '@nebular/theme';
import {FormsModule} from '@angular/forms';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {NgxEchartsModule} from 'ngx-echarts';



@NgModule({
  declarations: [TITTIJComponent],
    imports: [
        CommonModule,
        NbCardModule,
        NbDatepickerModule,
        FormsModule,
        NbSpinnerModule,
        Ng2SmartTableModule,
        NbButtonModule,
        NbInputModule,
        NgxEchartsModule,
    ],
})
export class TITTIJModule { }
