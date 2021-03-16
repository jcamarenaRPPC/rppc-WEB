import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';

export class ISOController {
  baseIP: string;
  path: string;

  constructor(baseIP: string, private http: HttpClient) {
    this.path = baseIP;
  }

  CertificadosEntregadosError(datos) {
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

    return this.http.post(this.path + 'CERTIFICADOSENTREGADOSCONERROR', datos, httpOptions).pipe(
      catchError(ISOController.handleError),
    );
  }
  InscripcionesEntregadasError(datos) {
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

    return this.http.post(this.path + 'PORCENTAJEDEINSCRIPCIONESENTREGADASCONERROR', datos, httpOptions).pipe(
      catchError(ISOController.handleError),
    );
  }
  SegundosAnalisisInscripciones(datos) {
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

    return this.http.post(this.path + 'SEGUNDOSANALISISENINSCRIPCIONES', datos, httpOptions).pipe(
      catchError(ISOController.handleError),
    );
  }
  SegundosAnalisisCertificaciones(datos) {
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

    return this.http.post(this.path + 'SEGUNDOSANALISISENCERTIFICACIONES', datos, httpOptions).pipe(
      catchError(ISOController.handleError),
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
