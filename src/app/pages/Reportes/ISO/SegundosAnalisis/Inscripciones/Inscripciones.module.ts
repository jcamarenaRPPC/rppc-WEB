import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InscripcionesComponent } from './Inscripciones.component';
import {NbButtonModule, NbCardModule, NbInputModule, NbSelectModule, NbSpinnerModule} from '@nebular/theme';
import {FormsModule} from '@angular/forms';
import {Ng2SmartTableModule} from 'ng2-smart-table';



@NgModule({
  declarations: [InscripcionesComponent],
  imports: [
    CommonModule,
    NbCardModule,
    NbInputModule,
    FormsModule,
    NbSelectModule,
    NbButtonModule,
    NbSpinnerModule,
    Ng2SmartTableModule,
  ],
})
export class InscripcionesModule { }
