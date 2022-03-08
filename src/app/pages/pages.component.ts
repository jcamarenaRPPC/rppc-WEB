import {Component, OnInit} from '@angular/core';
import {
  MENU_ADMINISTRACION, MENU_REGISTRADOR,
  MENU_REPORTESENS,
  MENU_REPORTESMXL,
  MENU_REPORTESROS,
  MENU_REPORTESTEC,
  MENU_REPORTESTIJ,
} from './pages-menu';
import {APIService} from '../service/apiservice.service';
import {first} from 'rxjs/operators';
import {NbMenuItem} from '@nebular/theme';
import {UsuariosRPP} from '../Modelos/UsuariosRPP/usuarios-rpp';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
        <nb-menu [items]="menu" autoCollapse="false"></nb-menu>
        <router-outlet>
        </router-outlet>
    </ngx-one-column-layout>
  `,
})

export class PagesComponent implements OnInit {
  menu: NbMenuItem[];

  constructor(private objServicio: APIService) {
    this.menu = [];
  }

  ngOnInit() {
/*
    const objUsuarioToken: Usuarios = new Usuarios();
    objUsuarioToken.TokenDeAcceso = localStorage.getItem('TokenDeAcceso');
*/
    // Crear objeto de usuario.
    const objUsuarioToken: UsuariosRPP = new UsuariosRPP();
    objUsuarioToken.LoginUSR = localStorage.getItem('Usuario');
    objUsuarioToken.Password = localStorage.getItem('Password');

    // logged in so return true
    // Validar que el token pertenece a un usuario valido.
    // Cargar el menu de opciones dependiendo del tipo de rol.
    this.objServicio.objUsuarioRPPController.validarCredenciales(objUsuarioToken).pipe(first()).subscribe(
    (respuestaServer: any) => {
      let lstUsuarios: UsuariosRPP = new UsuariosRPP();

      // Comvertir el string retornado a JSON.
      lstUsuarios = JSON.parse(respuestaServer);

      // Asignar usuario.
      this.objServicio.objUsuarioEnSistema = lstUsuarios[0];

      let intOficinaID: any;
      // Cargar el menu de opciones dependiendo del tipo de area.
      switch (this.objServicio.objUsuarioEnSistema.DESCR) {
        case 'ADMINISTRADOR':
          this.menu = MENU_ADMINISTRACION;
          break;
        case 'CONSULTA':
          intOficinaID = this.objServicio.objUsuarioEnSistema.OFICINA_ID;
          // CARGAR MENU DE MEXICALI.
          if (intOficinaID === 1) {
            this.menu = MENU_REPORTESMXL;
          }
          // CARGAR MENU DE TIJUANA.
          if (intOficinaID === 2) {
            this.menu = MENU_REPORTESTIJ;
          }
          // CARGAR MENU DE ENSENADA.
          if (intOficinaID === 3) {
            this.menu = MENU_REPORTESENS;
          }
          // CARGAR MENU DE TECATE.
          if (intOficinaID === 4) {
            this.menu = MENU_REPORTESTEC;
          }
          // CARGAR MENU DE ROSARITO.
          if (intOficinaID === 5) {
            this.menu = MENU_REPORTESROS;
          }
          break;
        case 'REGISTRADOR':
          // CARGAR MENU DE REGISTRADOR.
          this.menu = MENU_REGISTRADOR;
          break;
        default:
          this.menu = [];
      }
    }, error => {
        // Mostrar ventana.
      });
  }
}
