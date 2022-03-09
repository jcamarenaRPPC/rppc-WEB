import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
// @ts-ignore
import { baseURL } from '/BaseAPIURL';

export class IndicadoresController {
  baseIP: string;
  path: string;

  constructor(baseIP: string, private http: HttpClient) {
    this.path = baseIP;
  }

  agregarIndicador(datos) {
    // Estos encabezados no afectan en nada al hacer peticiones.
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Accept': 'application/json',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Credentials': 'true',
    });

    // Crear al opciones de la petición.
    const httpOptions = {
      headers: headers,
      /*
            withCredentials: true,
      */
    };

    return this.http.post(this.path + 'AgregarIndicadorISO', datos, httpOptions).pipe(
      catchError(IndicadoresController.handleError),
    );
  }

  borrarIndicador(datos) {
    // Estos encabezados no afectan en nada al hacer peticiones.
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Accept': 'application/json',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Credentials': 'true',
    });

    // Crear al opciones de la petición.
    const httpOptions = {
      headers: headers,
      /*
            withCredentials: true,
      */
    };

    return this.http.post(this.path + 'DEL_INDICADOR', datos, httpOptions).pipe(
      catchError(IndicadoresController.handleError),
    );
  }

  editarIndicador(datos) {
    // Estos encabezados no afectan en nada al hacer peticiones.
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Accept': 'application/json',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Credentials': 'true',
    });

    // Crear al opciones de la petición.
    const httpOptions = {
      headers: headers,
      /*
            withCredentials: true,
      */
    };

    return this.http.post(this.path + 'UPD_INDICADOR', datos, httpOptions).pipe(
      catchError(IndicadoresController.handleError),
    );
  }

  obtenerDatosIndicado(datos) {
    // En el parametro 'Datos' viene el numero de indicador
    // del cual se van a pedir sus datos
    // Estos encabezados no afectan en nada al hacer peticiones.
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Accept': 'application/json',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Credentials': 'true',
    });

    // Crear al opciones de la petición.
    const httpOptions = {
      headers: headers,
      /*
            withCredentials: true,
      */
    };

    return this.http.post(this.path + 'VerIndicadorISO', datos, httpOptions).pipe(
      catchError(IndicadoresController.handleError),
    );
  }

  InformacionRegistralViaOficios(datos) {
    // En el parametro 'Datos' viene el numero de indicador
    // del cual se van a pedir sus datos
    // Estos encabezados no afectan en nada al hacer peticiones.
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Accept': 'application/json',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Credentials': 'true',
    });

    // Crear al opciones de la petición.
    const httpOptions = {
      headers: headers,
      /*
            withCredentials: true,
      */
    };

    return this.http.post(this.path + 'INFORMACION_REGISTRAL_VIA_OFICIOS', datos, httpOptions).pipe(
      catchError(IndicadoresController.handleError),
    );
  }
  Capacitacion(datos) {
    // En el parametro 'Datos' viene el numero de indicador
    // del cual se van a pedir sus datos
    // Estos encabezados no afectan en nada al hacer peticiones.
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Accept': 'application/json',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Credentials': 'true',
    });

    // Crear al opciones de la petición.
    const httpOptions = {
      headers: headers,
      /*
            withCredentials: true,
      */
    };

    return this.http.post(this.path + 'CAPACITACION', datos, httpOptions).pipe(
      catchError(IndicadoresController.handleError),
    );
  }
  IndiceSatisfaccion(datos) {
    // En el parametro 'Datos' viene el numero de indicador
    // del cual se van a pedir sus datos
    // Estos encabezados no afectan en nada al hacer peticiones.
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Accept': 'application/json',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Credentials': 'true',
    });

    // Crear al opciones de la petición.
    const httpOptions = {
      headers: headers,
      /*
            withCredentials: true,
      */
    };

    return this.http.post(this.path + 'INDICE_SATISFACION', datos, httpOptions).pipe(
      catchError(IndicadoresController.handleError),
    );
  }
  ActasConstitutivasCiviles(datos) {
    // En el parametro 'Datos' viene el numero de indicador
    // del cual se van a pedir sus datos
    // Estos encabezados no afectan en nada al hacer peticiones.
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Accept': 'application/json',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Credentials': 'true',
    });

    // Crear al opciones de la petición.
    const httpOptions = {
      headers: headers,
      /*
            withCredentials: true,
      */
    };

    return this.http.post(this.path + 'ACTAS_CONSTITUTIVAS_CIVILES', datos, httpOptions).pipe(
      catchError(IndicadoresController.handleError),
    );
  }
  CertificadosEntregadosConError(datos) {
    // En el parametro 'Datos' viene el numero de indicador
    // del cual se van a pedir sus datos
    // Estos encabezados no afectan en nada al hacer peticiones.
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Accept': 'application/json',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Credentials': 'true',
    });

    // Crear al opciones de la petición.
    const httpOptions = {
      headers: headers,
      /*
            withCredentials: true,
      */
    };

    return this.http.post(this.path + 'CERTIFICADOS_ENTREGADOS_CON_ERROR', datos, httpOptions).pipe(
      catchError(IndicadoresController.handleError),
    );
  }
  InscripcionesEntregadasConError(datos) {
    // En el parametro 'Datos' viene el numero de indicador
    // del cual se van a pedir sus datos
    // Estos encabezados no afectan en nada al hacer peticiones.
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Accept': 'application/json',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Credentials': 'true',
    });

    // Crear al opciones de la petición.
    const httpOptions = {
      headers: headers,
      /*
            withCredentials: true,
      */
    };

    return this.http.post(this.path + 'INSCRIPCIONES_ENTREGADAS_CON_ERROR', datos, httpOptions).pipe(
      catchError(IndicadoresController.handleError),
    );
  }
  CertificadoDeNoPropiedad(datos) {
    // En el parametro 'Datos' viene el numero de indicador
    // del cual se van a pedir sus datos
    // Estos encabezados no afectan en nada al hacer peticiones.
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Accept': 'application/json',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Credentials': 'true',
    });

    // Crear al opciones de la petición.
    const httpOptions = {
      headers: headers,
      /*
            withCredentials: true,
      */
    };

    return this.http.post(this.path + 'CERTIFICADO_DE_NO_PROPIEDAD', datos, httpOptions).pipe(
      catchError(IndicadoresController.handleError),
    );
  }
  SegundosAnalisisEnInscripciones(datos) {
    // En el parametro 'Datos' viene el numero de indicador
    // del cual se van a pedir sus datos
    // Estos encabezados no afectan en nada al hacer peticiones.
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Accept': 'application/json',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Credentials': 'true',
    });

    // Crear al opciones de la petición.
    const httpOptions = {
      headers: headers,
      /*
            withCredentials: true,
      */
    };

    return this.http.post(this.path + 'SEGUNDOS_ANALISIS_EN_INSCRIPCIONES', datos, httpOptions).pipe(
      catchError(IndicadoresController.handleError),
    );
  }
  SegundosAnalisisEnCertificaciones(datos) {
    // En el parametro 'Datos' viene el numero de indicador
    // del cual se van a pedir sus datos
    // Estos encabezados no afectan en nada al hacer peticiones.
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Accept': 'application/json',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Credentials': 'true',
    });

    // Crear al opciones de la petición.
    const httpOptions = {
      headers: headers,
      /*
            withCredentials: true,
      */
    };

    return this.http.post(this.path + 'SEGUNDOS_ANALISIS_EN_CERTIFICACIONES', datos, httpOptions).pipe(
      catchError(IndicadoresController.handleError),
    );
  }
  private static handleError(error: HttpErrorResponse) {
    let err = error.message;
    if (error.statusText === 'Unknown Error') {
      err = 'Ocurrio un error al conectarse con el servidor';
    }
    return throwError(err);
  }
}
