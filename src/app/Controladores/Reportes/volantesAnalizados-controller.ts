import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';

export class VolantesAnalizadosController {
  baseIP: string;
  path: string;

  constructor(baseIP: string, private http: HttpClient) {
    this.path = baseIP;
  }

  consultarPendientesFirma(parametros) {
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

    return this.http.post(this.path + 'VolPendAnalisisoFirma', parametros, httpOptions).pipe(
      catchError(VolantesAnalizadosController.handleError),
    );
  }
  consultarPendientesCon1PorMunicipio(parametros) {
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

    return this.http.post(this.path + 'VolPendientesCon1', parametros, httpOptions).pipe(
      catchError(VolantesAnalizadosController.handleError),
    );
  }
  consultarPendientesCon2PorMunicipio(parametros) {
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

    return this.http.post(this.path + 'VolPendientesCon2', parametros, httpOptions).pipe(
      catchError(VolantesAnalizadosController.handleError),
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
