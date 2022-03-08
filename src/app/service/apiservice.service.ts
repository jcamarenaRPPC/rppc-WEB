import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CargaRegistradoresController} from '../Controladores/Reportes/cargaRegistradores-controller';
import {CargaAnalistasController} from '../Controladores/Reportes/cargaAnalistas-controller';
import {VolantesAnalizadosController} from '../Controladores/Reportes/volantesAnalizados-controller';
import {TramitesController} from '../Controladores/Reportes/tramites-controller';
import {UsuariosRPP} from '../Modelos/UsuariosRPP/usuarios-rpp';
import {UsuariosRPPController} from '../Controladores/usuarios-rpp-controller';
import {ISOController} from '../Controladores/Reportes/iso-controller';
import {NotariosController} from '../Controladores/Reportes/notarios-controller';
import {IndicadoresController} from '../Controladores/indicadores-controller';

@Injectable()
export class APIService {
  // API URL.
  // path = 'https://rppcweb.ebajacalifornia.gob.mx/RppWeb/Produccion/ReporteAPI/Reportes/';
   path = 'https://rppcweb.ebajacalifornia.gob.mx/RppWeb/Pruebas/ReporteAPI/Reportes/';

  // Path para probar reporte de para la ISO. ERROR: (net::ERR_CERT_AUTHORITY_INVALID).
  // path = 'http://rppcmxlapp/RppWeb/Pruebas/ReporteAPI/Reportes/';

  objUsuarioRPPController: UsuariosRPPController;
  objUsuarioEnSistema: UsuariosRPP;
  objCargaRegistradoresController: CargaRegistradoresController;
  objCargaAnalistasController: CargaAnalistasController;
  objVolantesAnalizadosController: VolantesAnalizadosController;
  objTramitesController: TramitesController;
  objISOController: ISOController;
  objNotariosController: NotariosController;
  objIndicadoresController: IndicadoresController;

  constructor(public http: HttpClient) {
    this.objUsuarioRPPController = new UsuariosRPPController(this.path, http);
    this.objCargaRegistradoresController = new CargaRegistradoresController(this.path, http);
    this.objCargaAnalistasController = new CargaAnalistasController(this.path, http);
    this.objVolantesAnalizadosController = new VolantesAnalizadosController(this.path, http);
    this.objTramitesController = new TramitesController(this.path, http);
    this.objISOController = new ISOController(this.path, http);
    this.objNotariosController = new NotariosController(this.path, http);
    this.objIndicadoresController = new IndicadoresController(this.path, http);
  }
}
