import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {AuthGuard} from '../service/auth-guard';
import {CrTotalizadoComponent} from './Reportes/CargaRegistradores/Totalizado/crTotalizado.component';
import {CrPorMunicipioComponent} from './Reportes/CargaRegistradores/PorMunicipio/crPorMunicipio.component';
import {CaPorMunicipioComponent} from './Reportes/CargaAnalistas/PorMunicipio/caPorMunicipio.component';
import {CaTotalizadoComponent} from './Reportes/CargaAnalistas/Totalizado/caTotalizado.component';
import {VaPendientesMXLComponent} from './Reportes/VolantesAnalizados/Municipios/Mexicali/vaPendientesMXL.component';
import {VaPendientesTIJComponent} from './Reportes/VolantesAnalizados/Municipios/Tijuana/vaPendientesTIJ.component';
import {VaPendientesENSComponent} from './Reportes/VolantesAnalizados/Municipios/Ensenada/vaPendientesENS.component';
import {VaPendientesTECComponent} from './Reportes/VolantesAnalizados/Municipios/Tecate/vaPendientesTEC.component';
import {VaPendientesROSComponent} from './Reportes/VolantesAnalizados/Municipios/Rosarito/vaPendientesROS.component';
import {TITMXLComponent} from './Reportes/Tramites/IngresadosYTerminados/Municipios/Mexicali/TITMXL.component';
import {TITTIJComponent} from './Reportes/Tramites/IngresadosYTerminados/Municipios/Tijuana/TITTIJ.component';
import {TITENSComponent} from './Reportes/Tramites/IngresadosYTerminados/Municipios/Ensenada/TITENS.component';
import {TITTECComponent} from './Reportes/Tramites/IngresadosYTerminados/Municipios/Tecate/TITTEC.component';
import {TITROSComponent} from './Reportes/Tramites/IngresadosYTerminados/Municipios/Rosarito/TITROS.component';
import {FirmasDiariasComponent} from './Reportes/FirmasDiarias/FirmasDiarias.component';
import {CaMexicaliComponent} from './Reportes/CargaAnalistas/Municipios/Mexicali/caMexicali.component';
import {CaTijuanaComponent} from './Reportes/CargaAnalistas/Municipios/Tijuana/caTijuana.component';
import {CaEnsenadaComponent} from './Reportes/CargaAnalistas/Municipios/Ensenada/caEnsenada.component';
import {CaTecateComponent} from './Reportes/CargaAnalistas/Municipios/Tecate/caTecate.component';
import {CaRosaritoComponent} from './Reportes/CargaAnalistas/Municipios/Rosarito/caRosarito.component';
import {CrMexicaliComponent} from './Reportes/CargaRegistradores/Municipios/Mexicali/crMexicali.component';
import {CrTijuanaComponent} from './Reportes/CargaRegistradores/Municipios/Tijuana/crTijuana.component';
import {CrEnsenadaComponent} from './Reportes/CargaRegistradores/Municipios/Ensenada/crEnsenada.component';
import {CrTecateComponent} from './Reportes/CargaRegistradores/Municipios/Tecate/crTecate.component';
import {CrRosaritoComponent} from './Reportes/CargaRegistradores/Municipios/Rosarito/crRosarito.component';
import {CertificadosEntregadosErrorComponent} from './Reportes/ISO/CertificadosEntregadosError/CertificadosEntregadosError.component';
import {BitacoraDocumentosErrorComponent} from './BitacoraDocumentosError/BitacoraDocumentosError.component';
import {InscripcionesEntregadasErrorComponent} from './Reportes/ISO/InscripcionesEntregadasError/InscripcionesEntregadasError.component';
import {InscripcionesComponent} from './Reportes/ISO/SegundosAnalisis/Inscripciones/Inscripciones.component';
import {CertificacionesComponent} from './Reportes/ISO/SegundosAnalisis/Certificaciones/Certificaciones.component';
import {MexicaliComponent} from './Reportes/Notarios/DetalladoPorMunicipio/mexicali/mexicali.component';
import {DetalladoPorEstadoComponent} from './Reportes/Notarios/DetalladoPorEstado/DetalladoPorEstado.component';
import {TijuanaComponent} from './Reportes/Notarios/DetalladoPorMunicipio/tijuana/tijuana.component';
import {EnsenadaComponent} from './Reportes/Notarios/DetalladoPorMunicipio/ensenada/ensenada.component';
import {TecateComponent} from './Reportes/Notarios/DetalladoPorMunicipio/tecate/tecate.component';
import {RosaritoComponent} from './Reportes/Notarios/DetalladoPorMunicipio/rosarito/rosarito.component';
import {ReporteIndicadoresComponent} from './indicadores/reporte-indicadores/reporte-indicadores.component';
import {CapturaIndicadoresComponent} from './indicadores/captura-indicadores/captura-indicadores.component';

const routes: Routes = [{
  path: '',
  canActivate: [AuthGuard],
  component: PagesComponent,
  children: [
    {
      canActivate: [AuthGuard],
      path: 'dashboard',
      component: DashboardComponent,
    },
    {
      canActivate: [AuthGuard],
      path: 'reportes/VolantesAnalizados/Municipios/Mexicali',
      component: VaPendientesMXLComponent,
    },
    {
      canActivate: [AuthGuard],
      path: 'reportes/VolantesAnalizados/Municipios/Tijuana',
      component: VaPendientesTIJComponent,
    },
    {
      canActivate: [AuthGuard],
      path: 'reportes/VolantesAnalizados/Municipios/Ensenada',
      component: VaPendientesENSComponent,
    },
    {
      canActivate: [AuthGuard],
      path: 'reportes/VolantesAnalizados/Municipios/Tecate',
      component: VaPendientesTECComponent,
    },
    {
      canActivate: [AuthGuard],
      path: 'reportes/VolantesAnalizados/Municipios/Rosarito',
      component: VaPendientesROSComponent,
    },
    {
      canActivate: [AuthGuard],
      path: 'reportes/CargaRegistradores/PorMunicipio',
      component: CrPorMunicipioComponent,
    },
    {
      canActivate: [AuthGuard],
      path: 'reportes/CargaRegistradores/Municipios/Mexicali',
      component: CrMexicaliComponent,
    },
    {
      canActivate: [AuthGuard],
      path: 'reportes/CargaRegistradores/Municipios/Tijuana',
      component: CrTijuanaComponent,
    },
    {
      canActivate: [AuthGuard],
      path: 'reportes/CargaRegistradores/Municipios/Ensenada',
      component: CrEnsenadaComponent,
    },
    {
      canActivate: [AuthGuard],
      path: 'reportes/CargaRegistradores/Municipios/Tecate',
      component: CrTecateComponent,
    },
    {
      canActivate: [AuthGuard],
      path: 'reportes/CargaRegistradores/Municipios/Rosarito',
      component: CrRosaritoComponent,
    },
    {
      canActivate: [AuthGuard],
      path: 'reportes/CargaRegistradores/Totalizado',
      component: CrTotalizadoComponent,
    },
    {
      canActivate: [AuthGuard],
      path: 'reportes/CargaAnalistas/PorMunicipio',
      component: CaPorMunicipioComponent,
    },
    {
      canActivate: [AuthGuard],
      path: 'reportes/CargaAnalistas/Municipios/Mexicali',
      component: CaMexicaliComponent,
    },
    {
      canActivate: [AuthGuard],
      path: 'reportes/CargaAnalistas/Municipios/Tijuana',
      component: CaTijuanaComponent,
    },
    {
      canActivate: [AuthGuard],
      path: 'reportes/CargaAnalistas/Municipios/Ensenada',
      component: CaEnsenadaComponent,
    },
    {
      canActivate: [AuthGuard],
      path: 'reportes/CargaAnalistas/Municipios/Tecate',
      component: CaTecateComponent,
    },
    {
      canActivate: [AuthGuard],
      path: 'reportes/CargaAnalistas/Municipios/Rosarito',
      component: CaRosaritoComponent,
    },
    {
      canActivate: [AuthGuard],
      path: 'reportes/CargaAnalistas/Totalizado',
      component: CaTotalizadoComponent,
    },
    {
      canActivate: [AuthGuard],
      path: 'reportes/Tramites/IngresadosYTerminados/Municipios/Mexicali',
      component: TITMXLComponent,
    },
    {
      canActivate: [AuthGuard],
      path: 'reportes/Tramites/IngresadosYTerminados/Municipios/Tijuana',
      component: TITTIJComponent,
    },
    {
      canActivate: [AuthGuard],
      path: 'reportes/Tramites/IngresadosYTerminados/Municipios/Ensenada',
      component: TITENSComponent,
    },
    {
      canActivate: [AuthGuard],
      path: 'reportes/Tramites/IngresadosYTerminados/Municipios/Tecate',
      component: TITTECComponent,
    },
    {
      canActivate: [AuthGuard],
      path: 'reportes/Tramites/IngresadosYTerminados/Municipios/Rosarito',
      component: TITROSComponent,
    },
    {
      canActivate: [AuthGuard],
      path: 'reportes/FirmasDiarias',
      component: FirmasDiariasComponent,
    },
    {
      canActivate: [AuthGuard],
      path: 'reportes/ISO/CertificadosEntregadosError',
      component: CertificadosEntregadosErrorComponent,
    },
    {
      canActivate: [AuthGuard],
      path: 'reportes/ISO/InscripcionesEntregadasError',
      component: InscripcionesEntregadasErrorComponent,
    },
    {
      canActivate: [AuthGuard],
      path: 'reportes/ISO/SegundosAnalisis/Inscripciones',
      component: InscripcionesComponent,
    },
    {
      canActivate: [AuthGuard],
      path: 'reportes/ISO/SegundosAnalisis/Certificaciones',
      component: CertificacionesComponent,
    },
    {
      canActivate: [AuthGuard],
      path: 'BitacoraDocumentosError',
      component: BitacoraDocumentosErrorComponent,
    },
    {
      canActivate: [AuthGuard],
      path: 'reportes/Notarios/DetalladoPorMunicipio/mexicali',
      component: MexicaliComponent,
    },
    {
      canActivate: [AuthGuard],
      path: 'reportes/Notarios/DetalladoPorMunicipio/tijuana',
      component: TijuanaComponent,
    },
    {
      canActivate: [AuthGuard],
      path: 'reportes/Notarios/DetalladoPorMunicipio/ensenada',
      component: EnsenadaComponent,
    },
    {
      canActivate: [AuthGuard],
      path: 'reportes/Notarios/DetalladoPorMunicipio/tecate',
      component: TecateComponent,
    },
    {
      canActivate: [AuthGuard],
      path: 'reportes/Notarios/DetalladoPorMunicipio/rosarito',
      component: RosaritoComponent,
    },
    {
      canActivate: [AuthGuard],
      path: 'reportes/Notarios/DetalladoPorEstado',
      component: DetalladoPorEstadoComponent,
    },
    {
      canActivate: [AuthGuard],
      path: 'indicadores/captura',
      component: CapturaIndicadoresComponent,
    },
    {
      canActivate: [AuthGuard],
      path: 'indicadores/reporte',
      component: ReporteIndicadoresComponent,
    },
    {
      // Cuando el path viene vacio, redireccionar a cualquiera de las de arriba.
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
