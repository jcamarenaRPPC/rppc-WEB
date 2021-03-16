import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrPorMunicipioComponent } from './crPorMunicipio.component';
import {
  NbButtonModule,
  NbCardModule,
  NbDatepickerModule,
  NbInputModule,
  NbSpinnerModule,
  NbTabsetModule,
} from '@nebular/theme';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [CrPorMunicipioComponent],
  imports: [
    CommonModule,
    NbCardModule,
    Ng2SmartTableModule,
    NbSpinnerModule,
    NbButtonModule,
    NbTabsetModule,
    NbDatepickerModule,
    NbInputModule,
    FormsModule,
  ],
})
export class CrPorMunicipioModule { }
