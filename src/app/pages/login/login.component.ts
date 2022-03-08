import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {APIService} from '../../service/apiservice.service';
import {first} from 'rxjs/operators';
import {NbGlobalLogicalPosition, NbToastrService} from '@nebular/theme';
import {AuthService} from '../../service/auth-service';
import {UsuariosRPP} from '../../Modelos/UsuariosRPP/usuarios-rpp';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})

export class LoginComponent implements OnInit {
  showAnimationUsuario: boolean = false;
  showAnimationContrasena: boolean = false;

  showPassword = false;
  spinnerLoading: any;

  // Habilitar / Deshabilitar password.
  getInputType() {
    if (this.showPassword) {
      return 'text';
    }
    return 'password';
  }

  // Asignar variable.
  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  // Asignar datos para inicio de sesión.
  Usuario: string = '';
  Contrasena: string = '';

/*
  Usuario: string = '';d
  Contrasena: string = '';
*/

  constructor(private objServicio: APIService, private router: Router, private alerta: NbToastrService, private objSesion: AuthService) {
  }

  ngOnInit(): void {
  }

  ValidarUsuario() {
    // Crear e inicializar variables.
    let bolBanderaError: boolean = false;

    // Validar campos vacios.
    if (this.Usuario === '') {
      // Actualizar bandera.
      bolBanderaError = true;

      // Activar la animacion para campo vacio.
      this.showAnimationUsuario = true;
      setTimeout(() => {
        this.showAnimationUsuario = false;
      }, 300);
    }
    if (this.Contrasena === '') {
      // Actualizar bandera.
      bolBanderaError = true;

      // Activar la animacion para campo vacio.
      this.showAnimationContrasena = true;
      setTimeout(() => {
        this.showAnimationContrasena = false;
      }, 300);
    }

    // Si la condición se cumple, termina la validación de datos y termina.
    if (bolBanderaError) {
      // Configurar y mostrar alerta para campos obligatorios.
      this.alerta.show('', 'Capturar campos obligatorios', { limit: 1, position: NbGlobalLogicalPosition.TOP_END,
        status: 'danger', preventDuplicates: true, icon: {icon: 'exclamation-triangle', pack: 'font-awesome'}});
      return;
    }

    // Asignar valores al objeto.
    this.objServicio.objUsuarioEnSistema = new UsuariosRPP();
    this.objServicio.objUsuarioEnSistema.LoginUSR = this.Usuario;
    this.objServicio.objUsuarioEnSistema.Password = this.Contrasena;

    // Iniciar animacion de carga.
    this.spinnerLoading = true;

    // Validar credenciales de usuario.
    this.objServicio.objUsuarioRPPController.validarCredenciales(this.objServicio.objUsuarioEnSistema).pipe(first()).subscribe(
      (respuestaServer: any) => {
        let lstUsuarios: UsuariosRPP;
        lstUsuarios = JSON.parse(respuestaServer);

        // Obtener usuario.
        this.objServicio.objUsuarioEnSistema = lstUsuarios[0];

        // Si la respuesta es invalida se regresa un arreglo vacío.
        if (Object.keys(lstUsuarios).length === 0) {
          // Terminar animacion de carga.
          this.spinnerLoading = false;

          // Mostrar ventana.
          this.alerta.show('', 'Usuario no válido', { limit: 1, position: NbGlobalLogicalPosition.TOP_END,
            status: 'danger', preventDuplicates: true, icon: {icon: 'exclamation-triangle', pack: 'font-awesome'}});
          return;
        }

        // Crear usuario para el local storage.
        const UsuarioLocalStorage: UsuariosRPP = new UsuariosRPP();
        UsuarioLocalStorage.EMPLEADO_ID = this.objServicio.objUsuarioEnSistema.EMPLEADO_ID;
        UsuarioLocalStorage.LoginUSR = this.Usuario;
        UsuarioLocalStorage.Password = this.Contrasena;
        UsuarioLocalStorage.OFICINA_ID = this.objServicio.objUsuarioEnSistema.OFICINA_ID;
        UsuarioLocalStorage.DESCR = this.objServicio.objUsuarioEnSistema.DESCR;

        this.objSesion.activarSesion(UsuarioLocalStorage);

        if (this.objServicio.objUsuarioEnSistema.EMPLEADO_ID !== null) {
          // Cargar la página de inicial para cada usuario.
          switch (this.objServicio.objUsuarioEnSistema.DESCR) {
            case 'ADMINISTRADOR':
            case 'CONSULTA':
              this.router.navigate(['pages/dashboard']);
              break;
            case 'REGISTRADOR':
              this.router.navigate(['pages/indicadores/reporte']);
              break;
            default:
              this.router.navigate(['pages/dashboard']);
          }
          // Terminar animacion de carga.
          this.spinnerLoading = false;
        } else {
          // Terminar animacion de carga.
          this.spinnerLoading = false;

          // Mostrar ventana.
          this.alerta.show('', 'Usuario incorrecto', { limit: 1, position: NbGlobalLogicalPosition.TOP_END,
            status: 'danger', preventDuplicates: true, icon: {icon: 'exclamation-triangle', pack: 'font-awesome'}});
        }
      }, error => {
        // Terminar animacion de carga.
        this.spinnerLoading = false;

        // Mostrar ventana.
        this.alerta.show('', error, { limit: 1, position: NbGlobalLogicalPosition.TOP_END,
          status: 'danger', preventDuplicates: true, icon: {icon: 'exclamation-triangle', pack: 'font-awesome'}});
      });
  }
}
