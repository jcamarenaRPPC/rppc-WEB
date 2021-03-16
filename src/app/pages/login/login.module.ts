import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import {
    NbButtonModule,
    NbCardModule,
    NbFormFieldModule,
    NbIconModule,
    NbInputModule,
    NbLayoutModule, NbSpinnerModule,
} from '@nebular/theme';
import {FormsModule} from '@angular/forms';



@NgModule({
  declarations: [LoginComponent],
    imports: [
        CommonModule,
        NbCardModule,
        FormsModule,
        NbInputModule,
        NbButtonModule,
        NbLayoutModule,
        NbIconModule,
        NbFormFieldModule,
        NbSpinnerModule,
    ],
})
export class LoginModule { }
