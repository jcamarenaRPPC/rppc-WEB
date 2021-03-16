import {Injectable} from '@angular/core';
import {UsuariosRPP} from '../Modelos/UsuariosRPP/usuarios-rpp';

@Injectable()
export class AuthService {

  constructor() {
  }

  activarSesion(objUsuarioRPP: UsuariosRPP) {
    // Guardar las variables que se pueden usar en toda la aplicación.
    localStorage.setItem('UsuarioID', objUsuarioRPP.EMPLEADO_ID);
    localStorage.setItem('Usuario', objUsuarioRPP.LoginUSR);
    localStorage.setItem('Password', objUsuarioRPP.Password);
    localStorage.setItem('OficinaID', objUsuarioRPP.OFICINA_ID);
    localStorage.setItem('TipoUsuario', objUsuarioRPP.DESCR);
  }

  logout() {
    // Borrar las variables que se pueden usar en toda la aplicación.
    localStorage.removeItem('UsuarioID');
    localStorage.removeItem('Usuario');
    localStorage.removeItem('Password');
    localStorage.removeItem('OficinaID');
    localStorage.removeItem('TipoUsuario');
  }
}
