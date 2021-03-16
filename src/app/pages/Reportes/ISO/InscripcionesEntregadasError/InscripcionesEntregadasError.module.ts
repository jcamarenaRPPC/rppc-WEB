import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InscripcionesEntregadasErrorComponent } from './InscripcionesEntregadasError.component';
import {NbButtonModule, NbCardModule, NbInputModule, NbSelectModule, NbSpinnerModule} from '@nebular/theme';
import {FormsModule} from '@angular/forms';
import {Ng2SmartTableModule} from 'ng2-smart-table';



@NgModule({
  declarations: [InscripcionesEntregadasErrorComponent],
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
export class InscripcionesEntregadasErrorModule { }
