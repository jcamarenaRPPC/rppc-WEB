import {Component, OnInit} from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {NbGlobalLogicalPosition, NbToastrService} from '@nebular/theme';
import {APIService} from '../../../../../service/apiservice.service';
import {first} from 'rxjs/operators';

@Component({
  selector: 'ngx-inscripciones',
  templateUrl: './Inscripciones.component.html',
  styleUrls: ['./Inscripciones.component.scss'],
})

export class InscripcionesComponent implements OnInit {
  // Declarar variables [ngmodel]
  mesInicio: string = '01';
  mesFin: string = '12';
  anio: string;

  // Declarar animaciones.
  animacionAnio: boolean = false;

  // Declarar objetos.
  mensajeLoading: string;
  tblDatos = [];

  // Declarar spinnners.
  spinnerLoading: any;
  tableSource: LocalDataSource;

  // Crear la configuración para la tabla de datos.
  tableConfig = {
    noDataMessage: 'No hay datos consultados.',
    mode: 'external',
    pager: {
      display: true,
      perPage: 15,
    },
    actions: {
      columnTitle: 'Acciones',
      add: false,
      edit: false,
      delete: false,
      position: 'right',
    },
    add: {
      addButtonContent: '<i class="fa fa-plus"></i>',
      createButtonContent: '<i class="fa fa-check"></i>',
      cancelButtonContent: '<i class="fa fa-times"></i>',
      confirmCreate: true,
    },
    edit: {
      editButtonContent: '<i class="fa fa-edit"></i>',
      saveButtonContent: '<i class="fa fa-check"></i>',
      cancelButtonContent: '<i class="fa fa-times"></i>',
      confirmSave: true,
    },
    delete: {
      deleteButtonContent: '<i class="fa fa-trash"></i>',
      confirmDelete: true,
    },
    columns: {},
  };

  constructor(private alerta: NbToastrService, private objServicio: APIService) {
    // Inicializar objetos.
    this.tableSource = new LocalDataSource(this.tblDatos);
  }

  ngOnInit(): void {
    this.anio = new Date().getFullYear().toString();
  }

  obtenerDatos() {
    // Crear variables banderas.
    let bolCamposVacios;

    // Validar que no esten vacios los campos.
    if (!this.anio) {
      this.animacionAnio = true;
      bolCamposVacios = true;
      setTimeout((arg) => {
          this.animacionAnio = false;
        },
        300);
    }

    if (!bolCamposVacios) {
      // Crear objeto de datos.
      const parametros = {
        'Fecha1': this.mesInicio + '/' + this.anio,
        'Fecha2': this.mesFin + '/' + this.anio,
      };

      // Activar animación loading.
      this.spinnerLoading = true;

      // Llamar al controlador y ejecutar la peticion httpRequest.
      this.objServicio.objISOController.SegundosAnalisisInscripciones(parametros).pipe(first()).subscribe((respuestaServer: any) => {
        // Convertir la respuesta a un objeto JSON.
        this.tblDatos = JSON.parse(respuestaServer);

        // Obtener los nombre de las columnas.
        const ArregloColumnas = Object.keys(this.tblDatos[0]);

        // Crear una variable aux que contenga la conf. de la tabla para trabajarla dentro
        // del for each ya que marca error si usamos this.table Config.
        const configuracionColumnas = this.tableConfig;

        // Recorrer el arreglo de columnas obtenidas.
        ArregloColumnas.forEach(function (value, key) {
          // Crear formato de columnas para la configuracion.
          configuracionColumnas.columns[value] = {
            title: value,
            filter: false,
          };
        });

        // Actualizar la configuracion original de la tabla con la configuracion
        // temporal auxiliar.
        this.tableConfig = Object.assign({}, configuracionColumnas);

        this.tableSource.load(this.tblDatos);
        this.tableSource.refresh();
        this.spinnerLoading = false;
      }, error => {
        // Desactivar la animación.
        this.spinnerLoading = false;

        // Mostrar ventana.
        this.alerta.show('', error, {
          limit: 1, position: NbGlobalLogicalPosition.TOP_END,
          status: 'danger', preventDuplicates: true, icon: {icon: 'exclamation-triangle', pack: 'font-awesome'}});
      });
    } else {
      this.alerta.show('', 'Capturar campos vacios', {
        limit: 1, position: NbGlobalLogicalPosition.TOP_END,
        status: 'danger', preventDuplicates: true, icon: {icon: 'exclamation-triangle', pack: 'font-awesome'}});
    }
  }
}
