import { Component, OnInit, OnDestroy} from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {NbGlobalLogicalPosition, NbToastrService} from '@nebular/theme';
import {APIService} from '../../../service/apiservice.service';
import {first} from 'rxjs/operators';
import {Angular5Csv} from 'angular5-csv/dist/Angular5-csv';

@Component({
  selector: 'ngx-reporte-indicadores',
  templateUrl: './reporte-indicadores.component.html',
  styleUrls: ['./reporte-indicadores.component.scss'],
})

export class ReporteIndicadoresComponent implements OnInit, OnDestroy   {
  // Declarar variables [ngmodel]
  anio: string;

  // Declarar animaciones.
  animacionAnio: boolean = false;

  // Declarar objetos.
  mensajeLoading: string;
  tblDatos = [];

  // Declarar spinnners.
  spinnerLoading: any;
  tableSource1: LocalDataSource; tableSource2: LocalDataSource;
  tableSource3: LocalDataSource; tableSource4: LocalDataSource;
  tableSource5: LocalDataSource; tableSource6: LocalDataSource;
  tableSource7: LocalDataSource; tableSource8: LocalDataSource;
  tableSource9: LocalDataSource; tableExcel: LocalDataSource;

  // Check de actualizacion tiempo real
  tiempoDeEspera: any;
  isChecked: boolean;

  // Habilitar boton excel.
  habilitarBotonCSV1: boolean = true;

  // Crear la configuración para las tabla de datos.
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
  tableConfig1 = {
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
  tableConfig2 = {
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
  tableConfig3 = {
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
  tableConfig4 = {
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
  tableConfig5 = {
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
  tableConfig6 = {
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
  tableConfig7 = {
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
  tableConfig8 = {
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
  tableConfig9 = {
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
    this.tableSource1 = new LocalDataSource(this.tblDatos);
    this.tableSource2 = new LocalDataSource(this.tblDatos);
    this.tableSource3 = new LocalDataSource(this.tblDatos);
    this.tableSource4 = new LocalDataSource(this.tblDatos);
    this.tableSource5 = new LocalDataSource(this.tblDatos);
    this.tableSource6 = new LocalDataSource(this.tblDatos);
    this.tableSource7 = new LocalDataSource(this.tblDatos);
    this.tableSource8 = new LocalDataSource(this.tblDatos);
    this.tableSource9 = new LocalDataSource(this.tblDatos);
    this.tableExcel = new LocalDataSource(this.tblDatos);
  }

  ngOnInit(): void {
    this.anio = new Date().getFullYear().toString();
  }

  ngOnDestroy(): void {
    // Al cerrar la ventana o refrescar la misma, limpiar variables.
    clearInterval(this.tiempoDeEspera);
  }

  obtenerDatos() {
    // Crear objeto de datos.
    const parametros = {
      'ANIOX': this.anio,
    };

    // Activar animación loading.
    this.spinnerLoading = true;

    // 1er Indicador
    // Llamar al controlador y ejecutar la peticion httpRequest.
    this.objServicio.objIndicadoresController.InformacionRegistralViaOficios(parametros).
    pipe(first()).subscribe((respuestaServer: any) => {
      // Convertir la respuesta a un objeto JSON.
      this.tblDatos = JSON.parse(respuestaServer);
      if (this.tblDatos.length > 0) {
        // Obtener los nombre de las columnas.
        const ArregloColumnas = Object.keys(this.tblDatos[0]);

        // Crear una variable aux que contenga la conf. de la tabla para trabajarla dentro
        // del for each ya que marca error si usamos this.table Config.
        const configuracionColumnas = this.tableConfig1;

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
        this.tableConfig1 = Object.assign({}, configuracionColumnas);
      }

      this.tableSource1.load(this.tblDatos);
      this.tableSource1.refresh();
    }, error => {
      // Mostrar ventana.
      this.alerta.show('', error, { limit: 1, position: NbGlobalLogicalPosition.TOP_END,
        status: 'danger', preventDuplicates: true, icon: {icon: 'exclamation-triangle', pack: 'font-awesome'}});
    });

    // 2do Indicador
    // Llamar al controlador y ejecutar la peticion httpRequest.
    this.objServicio.objIndicadoresController.Capacitacion(parametros).
    pipe(first()).subscribe((respuestaServer: any) => {
      // Convertir la respuesta a un objeto JSON.
      this.tblDatos = JSON.parse(respuestaServer);
      if (this.tblDatos.length > 0) {
        // Obtener los nombre de las columnas.
        const ArregloColumnas = Object.keys(this.tblDatos[0]);

        // Crear una variable aux que contenga la conf. de la tabla para trabajarla dentro
        // del for each ya que marca error si usamos this.table Config.
        const configuracionColumnas = this.tableConfig2;

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
        this.tableConfig2 = Object.assign({}, configuracionColumnas);
      }

      this.tableSource2.load(this.tblDatos);
      this.tableSource2.refresh();
    }, error => {
      // Mostrar ventana.
      this.alerta.show('', error, { limit: 1, position: NbGlobalLogicalPosition.TOP_END,
        status: 'danger', preventDuplicates: true, icon: {icon: 'exclamation-triangle', pack: 'font-awesome'}});
    });

    // 3er Indicador
    // Llamar al controlador y ejecutar la peticion httpRequest.
    this.objServicio.objIndicadoresController.IndiceSatisfaccion(parametros).
    pipe(first()).subscribe((respuestaServer: any) => {
      // Convertir la respuesta a un objeto JSON.
      this.tblDatos = JSON.parse(respuestaServer);
      if (this.tblDatos.length > 0) {
        // Obtener los nombre de las columnas.
        const ArregloColumnas = Object.keys(this.tblDatos[0]);

        // Crear una variable aux que contenga la conf. de la tabla para trabajarla dentro
        // del for each ya que marca error si usamos this.table Config.
        const configuracionColumnas = this.tableConfig3;

        // Recorrer el arreglo de columnas obtenidas.
        ArregloColumnas.forEach(function (value, key) {
          // Crear formato de columnas para la configurascion.
          configuracionColumnas.columns[value] = {
            title: value,
            filter: false,
          };
        });

        // Actualizar la configuracion original de la tabla con la configuracion
        // temporal auxiliar.
        this.tableConfig3 = Object.assign({}, configuracionColumnas);
      }

      this.tableSource3.load(this.tblDatos);
      this.tableSource3.refresh();
    }, error => {
      // Mostrar ventana.
      this.alerta.show('', error, { limit: 1, position: NbGlobalLogicalPosition.TOP_END,
        status: 'danger', preventDuplicates: true, icon: {icon: 'exclamation-triangle', pack: 'font-awesome'}});
    });

    // 4to Indicador
    // Llamar al controlador y ejecutar la peticion httpRequest.
    this.objServicio.objIndicadoresController.ActasConstitutivasCiviles(parametros).
    pipe(first()).subscribe((respuestaServer: any) => {
      // Convertir la respuesta a un objeto JSON.
      this.tblDatos = JSON.parse(respuestaServer);
      if (this.tblDatos.length > 0) {
        // Obtener los nombre de las columnas.
        const ArregloColumnas = Object.keys(this.tblDatos[0]);

        // Crear una variable aux que contenga la conf. de la tabla para trabajarla den tro
        // del for each ya que marca error si usamos this.table Config.
        const configuracionColumnas = this.tableConfig4;

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
        this.tableConfig4 = Object.assign({}, configuracionColumnas);
      }

      this.tableSource4.load(this.tblDatos);
      this.tableSource4.refresh();
    }, error => {
      // Desactivar la animación.
      this.spinnerLoading = false;

      // Mostrar ventana.
      this.alerta.show('', error, { limit: 1, position: NbGlobalLogicalPosition.TOP_END,
        status: 'danger', preventDuplicates: true, icon: {icon: 'exclamation-triangle', pack: 'font-awesome'}});
    });

    // 5to Indicador
    // Llamar al controlador y ejecutar la peticion httpRequest.
    this.objServicio.objIndicadoresController.CertificadosEntregadosConError(parametros).
    pipe(first()).subscribe((respuestaServer: any) => {
      // Convertir la respuesta a un objeto JSON.
      this.tblDatos = JSON.parse(respuestaServer);
      if (this.tblDatos.length > 0) {
        // Obtener los nombre de las columnas.
        const ArregloColumnas = Object.keys(this.tblDatos[0]);

        // Crear una variable aux que contenga la conf. de la tabla para trabajarla dentro
        // del for each ya que marca error si usamos this.table Config.
        const configuracionColumnas = this.tableConfig5;

        // Recorrer el arreglo de columnas obtenidas.
        ArregloColumnas.forEach(function (value, key) {
          // Crear formato de columnas para la configurascion.
          configuracionColumnas.columns[value] = {
            title: value,
            filter: false,
          };
        });

        // Actualizar la configuracion original de la tabla con la configuracion
        // temporal auxiliar.
        this.tableConfig5 = Object.assign({}, configuracionColumnas);
      }

      this.tableSource5.load(this.tblDatos);
      this.tableSource5.refresh();
    }, error => {
      // Mostrar ventana.
      this.alerta.show('', error, { limit: 1, position: NbGlobalLogicalPosition.TOP_END,
        status: 'danger', preventDuplicates: true, icon: {icon: 'exclamation-triangle', pack: 'font-awesome'}});
    });

    // 6to Indicador
    // Llamar al controlador y ejecutar la peticion httpRequest.
    this.objServicio.objIndicadoresController.InscripcionesEntregadasConError(parametros).
    pipe(first()).subscribe((respuestaServer: any) => {
      // Convertir la respuesta a un objeto JSON.
      this.tblDatos = JSON.parse(respuestaServer);
      if (this.tblDatos.length > 0) {
        // Obtener los nombre de las columnas.
        const ArregloColumnas = Object.keys(this.tblDatos[0]);

        // Crear una variable aux que contenga la conf. de la tabla para trabajarla dentro
        // del for each ya que marca error si usamos this.table Config.
        const configuracionColumnas = this.tableConfig6;

        // Recorrer el arreglo de columnas obtenidas.
        ArregloColumnas.forEach(function (value, key) {
          // Crear formato de columnas para la configurascion.
          configuracionColumnas.columns[value] = {
            title: value,
            filter: false,
          };
        });

        // Actualizar la configuracion original de la tabla con la configuracion
        // temporal auxiliar.
        this.tableConfig6 = Object.assign({}, configuracionColumnas);
      }

      this.tableSource6.load(this.tblDatos);
      this.tableSource6.refresh();
    }, error => {
      // Mostrar ventana.
      this.alerta.show('', error, { limit: 1, position: NbGlobalLogicalPosition.TOP_END,
        status: 'danger', preventDuplicates: true, icon: {icon: 'exclamation-triangle', pack: 'font-awesome'}});
    });

    // 7mo Indicador
    // Llamar al controlador y ejecutar la peticion httpRequest.
    this.objServicio.objIndicadoresController.CertificadoDeNoPropiedad(parametros).
    pipe(first()).subscribe((respuestaServer: any) => {
      // Convertir la respuesta a un objeto JSON.
      this.tblDatos = JSON.parse(respuestaServer);
      if (this.tblDatos.length > 0) {
        // Obtener los nombre de las columnas.
        const ArregloColumnas = Object.keys(this.tblDatos[0]);

        // Crear una variable aux que contenga la conf. de la tabla para trabajarla dentro
        // del for each ya que marca error si usamos this.table Config.
        const configuracionColumnas = this.tableConfig7;

        // Recorrer el arreglo de columnas obtenidas.
        ArregloColumnas.forEach(function (value, key) {
          // Crear formato de columnas para la configurascion.
          configuracionColumnas.columns[value] = {
            title: value,
            filter: false,
          };
        });

        // Actualizar la configuracion original de la tabla con la configuracion
        // temporal auxiliar.
        this.tableConfig7 = Object.assign({}, configuracionColumnas);
      }

      this.tableSource7.load(this.tblDatos);
      this.tableSource7.refresh();
    }, error => {
      // Mostrar ventana.
      this.alerta.show('', error, { limit: 1, position: NbGlobalLogicalPosition.TOP_END,
        status: 'danger', preventDuplicates: true, icon: {icon: 'exclamation-triangle', pack: 'font-awesome'}});
    });

    // 8vo Indicador
    // Llamar al controlador y ejecutar la peticion httpRequest.
    this.objServicio.objIndicadoresController.SegundosAnalisisEnInscripciones(parametros).
    pipe(first()).subscribe((respuestaServer: any) => {
      // Convertir la respuesta a un objeto JSON.
      this.tblDatos = JSON.parse(respuestaServer);
      if (this.tblDatos.length > 0) {
        // Obtener los nombre de las columnas.
        const ArregloColumnas = Object.keys(this.tblDatos[0]);

        // Crear una variable aux que contenga la conf. de la tabla para trabajarla dentro
        // del for each ya que marca error si usamos this.table Config.
        const configuracionColumnas = this.tableConfig8;

        // Recorrer el arreglo de columnas obtenidas.
        ArregloColumnas.forEach(function (value, key) {
          // Crear formato de columnas para la configurascion.
          configuracionColumnas.columns[value] = {
            title: value,
            filter: false,
          };
        });

        // Actualizar la configuracion original de la tabla con la configuracion
        // temporal auxiliar.
        this.tableConfig8 = Object.assign({}, configuracionColumnas);
      }

      this.tableSource8.load(this.tblDatos);
      this.tableSource8.refresh();
    }, error => {
      // Mostrar ventana.
      this.alerta.show('', error, { limit: 1, position: NbGlobalLogicalPosition.TOP_END,
        status: 'danger', preventDuplicates: true, icon: {icon: 'exclamation-triangle', pack: 'font-awesome'}});
    });

    // 9no Indicador
    // Llamar al controlador y ejecutar la peticion httpRequest.
    this.objServicio.objIndicadoresController.SegundosAnalisisEnCertificaciones(parametros).
    pipe(first()).subscribe((respuestaServer: any) => {
      // Convertir la respuesta a un objeto JSON.
      this.tblDatos = JSON.parse(respuestaServer);
      if (this.tblDatos.length > 0) {
        // Obtener los nombre de las columnas.
        const ArregloColumnas = Object.keys(this.tblDatos[0]);

        // Crear una variable aux que contenga la conf. de la tabla para trabajarla dentro
        // del for each ya que marca error si usamos this.table Config.
        const configuracionColumnas = this.tableConfig9;

        // Recorrer el arreglo de columnas obtenidas.
        ArregloColumnas.forEach(function (value, key) {
          // Crear formato de columnas para la configurascion.
          configuracionColumnas.columns[value] = {
            title: value,
            filter: false,
          };
        });

        // Actualizar la configuracion original de la tabla con la configuracion
        // temporal auxiliar.
        this.tableConfig9 = Object.assign({}, configuracionColumnas);
      }

      this.tableSource9.load(this.tblDatos);
      this.tableSource9.refresh();
      this.spinnerLoading = false;
      // Asignar lista de datos y refrescar pantalla.
      this.habilitarBotonCSV1 = false;
    }, error => {
      // Mostrar ventana.
      this.alerta.show('', error, { limit: 1, position: NbGlobalLogicalPosition.TOP_END,
        status: 'danger', preventDuplicates: true, icon: {icon: 'exclamation-triangle', pack: 'font-awesome'}});
    });
  }

  obtenerDatosTiempoReal(isChecked) {
    if (isChecked) {
      this.tiempoDeEspera = setInterval(() => {
        this.obtenerDatos();
      }, 5 * 1000);
    } else {
      clearInterval(this.tiempoDeEspera);
    }
  }

  downloadCSV(tablaDeDatos, caso) {
    let fileName: string = '';
    const options: any = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      showTitle: false,
      useBom: true,
      nullToEmptyString: true,
    };
    fileName = 'Indicadores';

    this.tableExcel.load([]);
    const datosTablas = this.tableExcel;
    this.tableSource1.getAll().then(datos1 => {
      this.tableSource2.getAll().then(datos2 => {
        this.tableSource3.getAll().then(datos3 => {
          this.tableSource4.getAll().then(datos4 => {
            this.tableSource5.getAll().then(datos5 => {
              this.tableSource6.getAll().then(datos6 => {
                this.tableSource7.getAll().then(datos7 => {
                  this.tableSource8.getAll().then(datos8 => {
                    this.tableSource9.getAll().then(datos9 => {
                      datosTablas.add({name: 'Información Registral Via Oficios'});
                      datosTablas.add({col1: 'MUNICIPIO', col2: 'META', col3: 'AÑO', col4: 'Total Tramite Enero',
                        col5: 'Total Dias Enero', col6: 'Tiempo prom Enero', col7: '% Cump Enero',
                        col8: 'Total Tramite Febrero', col9: 'Total Dias Febrero', col10: 'Tiempo prom Febrero',
                        col11: '% Cump Febrero', col12: 'Total Tramite Marzo', col13: 'Total Dias Marzo',
                        col14: 'Tiempo prom Marzo', col15: '% Cump Marzo', col16: 'Total Tramite Abril',
                        col17: 'Total Dias Abril', col18: 'Tiempo prom Abril', col19: '% Cump Abril',
                        col20: 'Total Tramite Mayo', col21: 'Total Dias Mayo', col22: 'Tiempo prom Mayo', col23: '% Cump Mayo',
                        col24: 'Total Tramite Junio', col25: 'Total Dias Junio', col26: 'Tiempo prom Junio', col27: '% Cump Junio',
                        col28: 'Total Tramite Julio', col29: 'Total Dias Julio', col30: 'Tiempo prom Julio', col31: '% Cump Julio',
                        col32: 'Total Tramite Agosto', col33: 'Total Dias Agosto', col34: 'Tiempo prom Agosto',
                        col35: '% Cump Agosto', col36: 'Total Tramite Septiembre', col37: 'Total Dias Septiembre',
                        col38: 'Tiempo prom Septiembre', col39: '% Cump Septiembre', col40: 'Total Tramite Octubre',
                        col41: 'Total Dias Octubre', col42: 'Tiempo prom Octubre', col43: '% Cump Octubre',
                        col44: 'Total Tramite Noviembre', col45: 'Total Dias Noviembre', col46: 'Tiempo prom Noviembre',
                        col47: '% Cump Noviembre', col48: 'Total Tramite Diciembre', col49: 'Total Dias Diciembre',
                        col50: 'Tiempo prom Diciembre', col51: '% Cump Diciembre'});
                      datos1.forEach( (element) => {
                        datosTablas.add(element);
                      });
                      datosTablas.add({name: 'Capacitación'});
                      datosTablas.add({col1: 'MUNICIPIO', col2: 'META', col3: 'AÑO',
                        col4: 'Total Personal Enero', col5: 'Cursos Enero', col6: '% Cump Enero',
                        col7: 'Total Personal Febrero', col8: 'Cursos Febrero', col9: '% Cump Febrero',
                        col10: 'Total Personal Marzo', col11: 'Cursos Marzo', col12: '% Cump Marzo',
                        col13: 'Total Personal Abril', col17: 'Cursos Abril', col18: '% Cump Abril',
                        col19: 'Total Personal Mayo', col20: 'Cursos Mayo', col21: '% Cump Mayo',
                        col22: 'Total Personal Junio', col23: 'Cursos Junio', col24: '% Cump Junio',
                        col25: 'Total Personal Julio', col26: 'Cursos Julio', col27: '% Cump Julio',
                        col28: 'Total Personal Agosto', col29: 'Cursos Agosto', col30: '% Cump Agosto',
                        col31: 'Total Personal Septiembre', col32: 'Cursos Septiembre', col33: '% Cump Septiembre',
                        col34: 'Total Personal Octubre', col35: 'Cursos Octubre', col36: '% Cump Octubre',
                        col37: 'Total Personal Noviembre', col38: 'Cursos Noviembre', col39: '% Cump Noviembre',
                        col40: 'Total Personal Diciembre', col41: 'Cursos Diciembre', col42: '% Cump Diciembre'});
                      datos2.forEach( (element) => {
                        datosTablas.add(element);
                      });
                      datosTablas.add({name: 'Indice de Satisfacción al Usuario'});
                      datosTablas.add({col1: 'MUNICIPIO', col2: 'META', col3: 'AÑO',
                        col4: 'Total Encuesta Enero', col5: 'Total Puntos Enero', col6: 'Prom Enero',
                        col8: '% Cump Enero', col9: 'Total Encuesta Febrero', col10: 'Total Puntos Febrero',
                        col11: 'Prom Febrero', col12: '% Cump Febrero', col13: 'Total Encuesta Marzo',
                        col14: 'Total Puntos Marzo', col15: 'Prom Marzo', col16: '% Cump Marzo',
                        col18: 'Total Encuesta Abril', col19: 'Total Puntos Abril', col20: 'Prom Abril',
                        col21: '% Cump Abril', col22: 'Total Encuesta Mayo', col23: 'Total Puntos Mayo',
                        col24: 'Prom Mayo', col25: '% Cump Mayo', col26: 'Total Encuesta Junio',
                        col27: 'Total Puntos Junio', col28: 'Prom Junio', col29: '% Cump Junio',
                        col30: 'Total Encuesta Julio', col31: 'Total Puntos Julio', col32: 'Prom Julio',
                        col33: '% Cump Julio', col34: 'Total Encuesta Agosto', col35: 'Total Puntos Agosto',
                        col36: 'Prom Agosto', col37: '% Cump Agosto', col38: 'Total Encuesta Septiembre',
                        col39: 'Total Puntos Septiembre', col41: 'Prom Septiembre', col42: '% Cump Septiembre',
                        col43: 'Total Encuesta Octubre', col44: 'Total Puntos Octubre', col45: 'Prom Octubre',
                        col46: '% Cump Octubre', col47: 'Total Encuesta Noviembre', col48: 'Total Puntos Noviembre',
                        col49: 'Prom Noviembre', col50: '% Cump Noviembre', col51: 'Total Encuesta Diciembre',
                        col52: 'Total Puntos Diciembre', col53: 'Prom Diciembre', col54: '% Cump Diciembre'});
                      datos3.forEach( (element) => {
                        datosTablas.add(element);
                      });
                      datosTablas.add({name: 'Actas Constitutivas Civiles'});
                      datosTablas.add({col1: 'MUNICIPIO', col2: 'META', col3: 'AÑO',
                        col4: 'Total Actas Enero', col5: 'Tiempo Total HRS Enero', col6: 'HRS Prom Enero',
                        col8: '% Cump Enero', col9: 'Total Actas Febrero', col10: 'Tiempo Total HRS Febrero',
                        col11: 'HRS Prom Febrero', col12: '% Cump Febrero', col13: 'Total Actas Marzo',
                        col14: 'Tiempo Total HRS Marzo', col15: 'HRS Prom Marzo', col16: '% Cump Marzo',
                        col18: 'Total Actas Abril', col19: 'Tiempo Total HRS Abril', col20: 'HRS Prom Abril',
                        col21: '% Cump Abril', col22: 'Total Actas Mayo', col23: 'Tiempo Total HRS Mayo',
                        col24: 'HRS Prom Mayo', col25: '% Cump Mayo', col26: 'Total Actas Junio',
                        col27: 'Tiempo Total HRS Junio', col28: 'HRS Prom Junio', col29: '% Cump Junio',
                        col30: 'Total Actas Julio', col31: 'Tiempo Total HRS Julio', col32: 'HRS Prom Julio',
                        col33: '% Cump Julio', col34: 'Total Actas Agosto', col35: 'Tiempo Total HRS Agosto',
                        col36: 'HRS Prom Agosto', col37: '% Cump Agosto', col38: 'Total Actas Septiembre',
                        col39: 'Tiempo Total HRS Septiembre', col41: 'HRS Prom Septiembre', col42: '% Cump Septiembre',
                        col43: 'Total Actas Octubre', col44: 'Tiempo Total HRS Octubre', col45: 'HRS Prom Octubre',
                        col46: '% Cump Octubre', col47: 'Total Actas Noviembre', col48: 'Tiempo Total HRS Noviembre',
                        col49: 'HRS Prom Noviembre', col50: '% Cump Noviembre', col51: 'Total Actas Diciembre',
                        col52: 'Tiempo Total HRS Diciembre', col53: 'HRS Prom Diciembre', col54: '% Cump Diciembre'});
                      datos4.forEach( (element) => {
                        datosTablas.add(element);
                      });
                      datosTablas.add({name: 'Porcentaje de Certificados Entregados con Error'});
                      datosTablas.add({col1: 'MUNICIPIO', col2: 'META', col3: 'AÑO',
                        col4: 'Total Certif Enero', col5: 'Total Errores Enero', col6: 'Prom Enero',
                        col8: '% Cump Enero', col9: 'Total Certif Febrero', col10: 'Total Errores Febrero',
                        col11: 'Prom Febrero', col12: '% Cump Febrero', col13: 'Total Certif Marzo',
                        col14: 'Total Errores Marzo', col15: 'Prom Marzo', col16: '% Cump Marzo',
                        col18: 'Total Certif Abril', col19: 'Total Errores Abril', col20: 'Prom Abril',
                        col21: '% Cump Abril', col22: 'Total Certif Mayo', col23: 'Total Errores Mayo',
                        col24: 'Prom Mayo', col25: '% Cump Mayo', col26: 'Total Certif Junio',
                        col27: 'Total Errores Junio', col28: 'Prom Junio', col29: '% Cump Junio',
                        col30: 'Total Certif Julio', col31: 'Total Errores Julio', col32: 'Prom Julio',
                        col33: '% Cump Julio', col34: 'Total Certif Agosto', col35: 'Total Errores Agosto',
                        col36: 'Prom Agosto', col37: '% Cump Agosto', col38: 'Total Certif Septiembre',
                        col39: 'Total Errores Septiembre', col41: 'Prom Septiembre', col42: '% Cump Septiembre',
                        col43: 'Total Certif Octubre', col44: 'Total Errores Octubre', col45: 'Prom Octubre',
                        col46: '% Cump Octubre', col47: 'Total Certif Noviembre', col48: 'Total Errores Noviembre',
                        col49: 'Prom Noviembre', col50: '% Cump Noviembre', col51: 'Total Certif Diciembre',
                        col52: 'Total Errores Diciembre', col53: 'Prom Diciembre', col54: '% Cump Diciembre'});
                      datos5.forEach( (element) => {
                        datosTablas.add(element);
                      });
                      datosTablas.add({name: 'Porcentaje de Inscripciones Entregadas con Error'});
                      datosTablas.add({col1: 'MUNICIPIO', col2: 'META', col3: 'AÑO',
                        col4: 'Total Inscrip Enero', col5: 'Total Errores Enero', col6: 'Prom Enero',
                        col8: '% Cump Enero', col9: 'Total Inscrip Febrero', col10: 'Total Errores Febrero',
                        col11: 'Prom Febrero', col12: '% Cump Febrero', col13: 'Total Inscrip Marzo',
                        col14: 'Total Errores Marzo', col15: 'Prom Marzo', col16: '% Cump Marzo',
                        col18: 'Total Inscrip Abril', col19: 'Total Errores Abril', col20: 'Prom Abril',
                        col21: '% Cump Abril', col22: 'Total Inscrip Mayo', col23: 'Total Errores Mayo',
                        col24: 'Prom Mayo', col25: '% Cump Mayo', col26: 'Total Inscrip Junio',
                        col27: 'Total Errores Junio', col28: 'Prom Junio', col29: '% Cump Junio',
                        col30: 'Total Inscrip Julio', col31: 'Total Errores Julio', col32: 'Prom Julio',
                        col33: '% Cump Julio', col34: 'Total Inscrip Agosto', col35: 'Total Errores Agosto',
                        col36: 'Prom Agosto', col37: '% Cump Agosto', col38: 'Total Inscrip Septiembre',
                        col39: 'Total Errores Septiembre', col41: 'Prom Septiembre', col42: '% Cump Septiembre',
                        col43: 'Total Inscrip Octubre', col44: 'Total Errores Octubre', col45: 'Prom Octubre',
                        col46: '% Cump Octubre', col47: 'Total Inscrip Noviembre', col48: 'Total Errores Noviembre',
                        col49: 'Prom Noviembre', col50: '% Cump Noviembre', col51: 'Total Inscrip Diciembre',
                        col52: 'Total Errores Diciembre', col53: 'Prom Diciembre', col54: '% Cump Diciembre'});
                      datos6.forEach( (element) => {
                        datosTablas.add(element);
                      });
                      datosTablas.add({name: 'Certificado de No Propiedad'});
                      datosTablas.add({col1: 'MUNICIPIO', col2: 'META', col3: 'AÑO',
                        col4: 'Total Tramite Enero', col5: 'Total Minutos Enero', col6: 'Minutos Prom Enero',
                        col8: '% Cump Enero', col9: 'Total Tramite Febrero', col10: 'Total Minutos Febrero',
                        col11: 'Minutos Prom Febrero', col12: '% Cump Febrero', col13: 'Total Tramite Marzo',
                        col14: 'Total Minutos Marzo', col15: 'Minutos Prom Marzo', col16: '% Cump Marzo',
                        col18: 'Total Tramite Abril', col19: 'Total Minutos Abril', col20: 'Minutos Prom Abril',
                        col21: '% Cump Abril', col22: 'Total Tramite Mayo', col23: 'Total Minutos Mayo',
                        col24: 'Minutos Prom Mayo', col25: '% Cump Mayo', col26: 'Total Tramite Junio',
                        col27: 'Total Minutos Junio', col28: 'Minutos Prom Junio', col29: '% Cump Junio',
                        col30: 'Total Tramite Julio', col31: 'Total Minutos Julio', col32: 'Minutos Prom Julio',
                        col33: '% Cump Julio', col34: 'Total Tramite Agosto', col35: 'Total Minutos Agosto',
                        col36: 'Minutos Prom Agosto', col37: '% Cump Agosto', col38: 'Total Tramite Septiembre',
                        col39: 'Total Minutos Septiembre', col41: 'Minutos Prom Septiembre', col42: '% Cump Septiembre',
                        col43: 'Total Tramite Octubre', col44: 'Total Minutos Octubre', col45: 'Minutos Prom Octubre',
                        col46: '% Cump Octubre', col47: 'Total Tramite Noviembre', col48: 'Total Minutos Noviembre',
                        col49: 'Minutos Prom Noviembre', col50: '% Cump Noviembre', col51: 'Total Tramite Diciembre',
                        col52: 'Total Minutos Diciembre', col53: 'Minutos Prom Diciembre', col54: '% Cump Diciembre'});
                      datos7.forEach( (element) => {
                        datosTablas.add(element);
                      });
                      datosTablas.add({name: 'Segundos Análisis en Inscripciones'});
                      datosTablas.add({col1: 'MUNICIPIO', col2: 'META', col3: 'AÑO',
                        col4: 'Total Tramite Enero', col5: 'Total Errores Enero', col6: 'Prom Enero',
                        col8: '% Cump Enero', col9: 'Total Tramite Febrero', col10: 'Total Errores Febrero',
                        col11: 'Prom Febrero', col12: '% Cump Febrero', col13: 'Total Tramite Marzo',
                        col14: 'Total Errores Marzo', col15: 'Prom Marzo', col16: '% Cump Marzo',
                        col18: 'Total Tramite Abril', col19: 'Total Errores Abril', col20: 'Prom Abril',
                        col21: '% Cump Abril', col22: 'Total Tramite Mayo', col23: 'Total Errores Mayo',
                        col24: 'Prom Mayo', col25: '% Cump Mayo', col26: 'Total Tramite Junio',
                        col27: 'Total Errores Junio', col28: 'Prom Junio', col29: '% Cump Junio',
                        col30: 'Total Tramite Julio', col31: 'Total Errores Julio', col32: 'Prom Julio',
                        col33: '% Cump Julio', col34: 'Total Tramite Agosto', col35: 'Total Errores Agosto',
                        col36: 'Prom Agosto', col37: '% Cump Agosto', col38: 'Total Tramite Septiembre',
                        col39: 'Total Errores Septiembre', col41: 'Prom Septiembre', col42: '% Cump Septiembre',
                        col43: 'Total Tramite Octubre', col44: 'Total Errores Octubre', col45: 'Prom Octubre',
                        col46: '% Cump Octubre', col47: 'Total Tramite Noviembre', col48: 'Total Errores Noviembre',
                        col49: 'Prom Noviembre', col50: '% Cump Noviembre', col51: 'Total Tramite Diciembre',
                        col52: 'Total Errores Diciembre', col53: 'Prom Diciembre', col54: '% Cump Diciembre'});
                      datos8.forEach( (element) => {
                        datosTablas.add(element);
                      });
                      datosTablas.add({name: 'Segundos Análisis en Certificaciones'});
                      datosTablas.add({col1: 'MUNICIPIO', col2: 'META', col3: 'AÑO',
                        col4: 'Total Tramite Enero', col5: 'Total Errores Enero', col6: 'Prom Enero',
                        col8: '% Cump Enero', col9: 'Total Tramite Febrero', col10: 'Total Errores Febrero',
                        col11: 'Prom Febrero', col12: '% Cump Febrero', col13: 'Total Tramite Marzo',
                        col14: 'Total Errores Marzo', col15: 'Prom Marzo', col16: '% Cump Marzo',
                        col18: 'Total Tramite Abril', col19: 'Total Errores Abril', col20: 'Prom Abril',
                        col21: '% Cump Abril', col22: 'Total Tramite Mayo', col23: 'Total Errores Mayo',
                        col24: 'Prom Mayo', col25: '% Cump Mayo', col26: 'Total Tramite Junio',
                        col27: 'Total Errores Junio', col28: 'Prom Junio', col29: '% Cump Junio',
                        col30: 'Total Tramite Julio', col31: 'Total Errores Julio', col32: 'Prom Julio',
                        col33: '% Cump Julio', col34: 'Total Tramite Agosto', col35: 'Total Errores Agosto',
                        col36: 'Prom Agosto', col37: '% Cump Agosto', col38: 'Total Tramite Septiembre',
                        col39: 'Total Errores Septiembre', col41: 'Prom Septiembre', col42: '% Cump Septiembre',
                        col43: 'Total Tramite Octubre', col44: 'Total Errores Octubre', col45: 'Prom Octubre',
                        col46: '% Cump Octubre', col47: 'Total Tramite Noviembre', col48: 'Total Errores Noviembre',
                        col49: 'Prom Noviembre', col50: '% Cump Noviembre', col51: 'Total Tramite Diciembre',
                        col52: 'Total Errores Diciembre', col53: 'Prom Diciembre', col54: '% Cump Diciembre'});
                      datos9.forEach( (element) => {
                        datosTablas.add(element);
                      });
                      // console.log(datosTablas.count());
                      datosTablas.getAll().then(data => {
                        new Angular5Csv(data, 'Indicadores', options);
                      });
                    });
                  });
                });
              });
            });
          });
        });
      });
      // datos1.forEach( (element) => {
      //   datosTablas.add(element);
      //   datosTablas.refresh();
      // });
    });

    // Configurar y mostrar alerta para campos obligatorios.
    this.alerta.show('', 'Reporte generado satisfactoriamente', { limit: 1, position: NbGlobalLogicalPosition.TOP_END,
      destroyByClick: true, status: 'info', preventDuplicates: true, icon: {icon: 'check', pack: 'font-awesome'}});
  }
}
