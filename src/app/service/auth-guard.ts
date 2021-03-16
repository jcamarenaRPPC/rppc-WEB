import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {first} from 'rxjs/operators';
import {APIService} from './apiservice.service';
import {UsuariosRPP} from '../Modelos/UsuariosRPP/usuarios-rpp';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private objServicio: APIService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // Validar que el local storage contenga algo.
    if (localStorage.getItem('Usuario') && localStorage.getItem('Password')) {
      const objUsuarioToken: UsuariosRPP = new UsuariosRPP();
      objUsuarioToken.LoginUSR = localStorage.getItem('Usuario');
      objUsuarioToken.Password = localStorage.getItem('Password');

      // logged in so return true
      // Validar que el token pertenece a un usuario valido.
      this.objServicio.objUsuarioRPPController.validarCredenciales(objUsuarioToken).pipe(first()).subscribe(
        (respuestaServer: any) => {
          let lstUsuarios: UsuariosRPP;

          // Convertir a JSON la respuesta STRING del servidor.
          lstUsuarios = JSON.parse(respuestaServer);

          // Asignar el usuario al objeto en sistema.
          this.objServicio.objUsuarioEnSistema = lstUsuarios[0];

          // Si un tipo de usuario contiene mas permisos y se declara una redirección, siempre cargará a la redirección.
          switch (this.objServicio.objUsuarioEnSistema.DESCR) {
            case 'ADMINISTRADOR':
              if (!state.url.includes('dashboard')) {
              }
              break;
          }
      }, error => {
        // Mostrar ventana.
         this.router.navigate(['/login']);
     });
    }else {
      // Mostrar ventana.
      this.router.navigate(['/login']);
    }
    return true;
  }
}
