import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
// @ts-ignore
import APIURL from 'assets/ApiURLAddress.json';

export class UsuariosRPPController {
  baseIP: string;
  path: string;

  constructor(baseIP: string, private http: HttpClient) {
    this.path = 'https://rppcweb.ebajacalifornia.gob.mx/RppWeb/Produccion/ReporteAPI/Reportes/ProbarAcceso';
  }

  validarCredenciales(data) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Accept': 'application/json',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Credentials': 'true',
    });

    const httpOptions = {
      headers: headers,
    };

    return this.http.post(this.path, data, httpOptions).pipe(catchError(UsuariosRPPController.handleError),
    );
  }

  private static handleError(error: HttpErrorResponse) {
    let err = error.message;
    if (error.status === 401) {
      err = 'No autorizado';
    }
    return throwError(err);
  }
}
