import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CertificadosEntregadosErrorComponent } from './CertificadosEntregadosError.component';
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



@NgModule({
  declarations: [CertificadosEntregadosErrorComponent],
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
})
export class CertificadosEntregadosErrorModule { }
