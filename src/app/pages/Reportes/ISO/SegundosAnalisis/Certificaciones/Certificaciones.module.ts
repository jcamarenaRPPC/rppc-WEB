import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CertificacionesComponent } from './Certificaciones.component';
import {NbButtonModule, NbCardModule, NbInputModule, NbSelectModule, NbSpinnerModule} from '@nebular/theme';
import {FormsModule} from '@angular/forms';
import {Ng2SmartTableModule} from 'ng2-smart-table';



@NgModule({
  declarations: [CertificacionesComponent],
  imports: [
    CommonModule,
    NbCardModule,
    FormsModule,
    NbSelectModule,
    NbButtonModule,
    NbSpinnerModule,
    Ng2SmartTableModule,
    NbInputModule,
  ],
})
export class CertificacionesModule { }
