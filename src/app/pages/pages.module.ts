import { NgModule } from '@angular/core';
import {
  NbButtonModule,
  NbCardModule, NbDatepickerModule,
  NbInputModule,
  NbMenuModule, NbSelectModule,
  NbSpinnerModule,
  NbTabsetModule, NbTooltipModule,
} from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import { CaTotalizadoComponent } from './Reportes/CargaAnalistas/Totalizado/caTotalizado.component';
import { CaPorMunicipioComponent } from './Reportes/CargaAnalistas/PorMunicipio/caPorMunicipio.component';
import {FormsModule} from '@angular/forms';
import { VaPendientesMXLComponent } from './Reportes/VolantesAnalizados/Municipios/Mexicali/vaPendientesMXL.component';
import { VaPendientesTIJComponent } from './Reportes/VolantesAnalizados/Municipios/Tijuana/vaPendientesTIJ.component';
import { VaPendientesENSComponent } from './Reportes/VolantesAnalizados/Municipios/Ensenada/vaPendientesENS.component';
import { VaPendientesROSComponent } from './Reportes/VolantesAnalizados/Municipios/Rosarito/vaPendientesROS.component';
import {PieChartModule} from '@swimlane/ngx-charts';
import {NgxEchartsModule} from 'ngx-echarts';
import { FirmasDiariasComponent } from './Reportes/FirmasDiarias/FirmasDiarias.component';
import { CaMexicaliComponent } from './Reportes/CargaAnalistas/Municipios/Mexicali/caMexicali.component';
import { CaTijuanaComponent } from './Reportes/CargaAnalistas/Municipios/Tijuana/caTijuana.component';
import { CaEnsenadaComponent } from './Reportes/CargaAnalistas/Municipios/Ensenada/caEnsenada.component';
import { CaTecateComponent } from './Reportes/CargaAnalistas/Municipios/Tecate/caTecate.component';
import { CaRosaritoComponent } from './Reportes/CargaAnalistas/Municipios/Rosarito/caRosarito.component';
import { CrMexicaliComponent } from './Reportes/CargaRegistradores/Municipios/Mexicali/crMexicali.component';
import { CrTijuanaComponent } from './Reportes/CargaRegistradores/Municipios/Tijuana/crTijuana.component';
import { CrEnsenadaComponent } from './Reportes/CargaRegistradores/Municipios/Ensenada/crEnsenada.component';
import { CrTecateComponent } from './Reportes/CargaRegistradores/Municipios/Tecate/crTecate.component';
import { CrRosaritoComponent } from './Reportes/CargaRegistradores/Municipios/Rosarito/crRosarito.component';
import { BitacoraDocumentosErrorComponent } from './BitacoraDocumentosError/BitacoraDocumentosError.component';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    NbCardModule,
    Ng2SmartTableModule,
    NbButtonModule,
    NbSpinnerModule,
    NbTabsetModule,
    NbInputModule,
    NbDatepickerModule,
    FormsModule,
    NbTooltipModule,
    PieChartModule,
    NgxEchartsModule,
    NbSelectModule,
  ],
  declarations: [
    PagesComponent,
    CaTotalizadoComponent,
    CaPorMunicipioComponent,
    VaPendientesMXLComponent,
    VaPendientesTIJComponent,
    VaPendientesENSComponent,
    VaPendientesROSComponent,
    FirmasDiariasComponent,
    CaMexicaliComponent,
    CaTijuanaComponent,
    CaEnsenadaComponent,
    CaTecateComponent,
    CaRosaritoComponent,
    CrMexicaliComponent,
    CrTijuanaComponent,
    CrEnsenadaComponent,
    CrTecateComponent,
    CrRosaritoComponent,
    BitacoraDocumentosErrorComponent,
  ],
})
export class PagesModule {
}
