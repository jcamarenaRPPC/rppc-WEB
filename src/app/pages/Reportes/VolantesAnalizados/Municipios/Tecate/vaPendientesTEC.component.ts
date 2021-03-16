import { Component, OnInit } from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {NbGlobalLogicalPosition, NbToastrService} from '@nebular/theme';
import {APIService} from '../../../../../service/apiservice.service';
import {first} from 'rxjs/operators';
import {Angular5Csv} from 'angular5-csv/dist/Angular5-csv';

@Component({
  selector: 'ngx-va-pendientes-tec',
  templateUrl: './vaPendientesTEC.component.html',
  styleUrls: ['./vaPendientesTEC.component.scss'],
})
export class VaPendientesTECComponent implements OnInit {
  // Declarar variables [ngmodel]
  Fecha1 = new Date();
  Fecha2 = new Date();

  // Declarar objetos.
  mensajeLoading: string;
  tblDatosCo1TEC = [];
  tblDatosCo2TEC = [];
  tblDatosDetalladoTEC = [];

  // Declarar spinnners.
  spinnerLoadingCon1TEC: any;
  spinnerLoadingCon2TEC: any;
  spinnerLoadingDetalladoTEC: any;

  // Grafica de barras co1.
  chartDataBarrasCo1TEC: any;
  barDataCo1TEC = [];
  titulosCo1TEC = [];

  // Grafica de barras co2.
  chartDataBarrasCo2TEC: any;
  barDataCo2TEC = [];
  titulosCo2TEC = [];

  // Habilitar boton excel.
  habilitarBotonCSV1: boolean = true;
  habilitarBotonCSV2: boolean = true;
  habilitarBotonCSV3: boolean = true;

  tableSourceCon1TEC: LocalDataSource;
  tableSourceCon2TEC: LocalDataSource;
  tableSourceDetalladoTEC: LocalDataSource;

  // Crear la configuración para la tabla de datos.
  tableConfigCon1TEC = {
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
    columns: {
      ESTATUS: {
        title: 'Estatus',
      },
      ENLINEA: {
        title: 'En linea',
      },
      FISICO: {
        title: 'Físico',
      },
      VOLANTE: {
        title: 'Volante',
      },
    },
  };
  tableConfigCon2TEC = {
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
    columns: {
      TIPODETRAMITE: {
        title: 'Tipo de trámite',
      },
      ENLINEA: {
        title: 'En linea',
      },
      FISICO: {
        title: 'Físico',
      },
      VOLANTE: {
        title: 'Volante',
      },
    },
  };
  tableConfigDetalladoTEC = {
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
    columns: {
      VOLANTE: {
        title: 'Volante',
      },
      ESTATUS: {
        title: 'Estatus',
      },
      TIPODETRAMITE: {
        title: 'Tipo de trámite',
      },
      ACTO: {
        title: 'Acto',
      },
      ULTIMOMOVIMIENTO: {
        title: 'Ultimo movimiento',
      },
      ORIGEN: {
        title: 'Origen',
      },
      ANALISTA: {
        title: 'Analista',
      },
      SUBREGISTRADORREGISTRADOR: {
        title: 'Subregistrador/Registrador',
      },
    },
  };

  constructor(private alerta: NbToastrService, private objServicio: APIService) {
    // Inicializar objetos mexicali.
    this.tableSourceCon1TEC = new LocalDataSource(this.tblDatosCo1TEC);
    this.tableSourceCon2TEC = new LocalDataSource(this.tblDatosCo2TEC);
    this.tableSourceDetalladoTEC = new LocalDataSource(this.tblDatosDetalladoTEC);
  }

  ngOnInit(): void {
  }

  obtenerDatosCon1TEC() {
    // Crear objeto de datos.
    const parametros = {
      'Fecha1': this.Fecha1.toLocaleDateString(),
      'Fecha2': this.Fecha2.toLocaleDateString(),
      'OFICINAID': '4',
    };

    // Activar animación loading.
    this.spinnerLoadingCon1TEC = true;

    // Llamar al controlador y ejecutar la peticion httpRequest.
    this.objServicio.objVolantesAnalizadosController.consultarPendientesCon1PorMunicipio(parametros).pipe(first()).
    subscribe((respuestaServer: any) => {
      // Convertir la respuesta a un objeto JSON.
      this.tblDatosCo1TEC = JSON.parse(respuestaServer);

      // Asignar lista de datos y refrescar pantalla.
      this.tableSourceCon1TEC.load(this.tblDatosCo1TEC);
      this.tableSourceCon1TEC.refresh();
      this.spinnerLoadingCon1TEC = false;
      this.habilitarBotonCSV1 = false;

      // Etiquetas de info, que equivalen a la cantidad de barras.
      this.titulosCo1TEC = ['product', 'En linea', 'Físico', 'Volante'];

      this.chartDataBarrasCo1TEC = {
        legend: {
          text: 'Pendientes de firma',
          subtext: '',
          x: 'center',
        },
        tooltip: {},
        dataset: {
          source: [
            // Etiquetas de info, que equivalen a la cantidad de barras.
            this.titulosCo1TEC,
            // Categoria eje x, valor para la cantidad de barras.
            this.barDataCo1TEC,
            /*
                      Ejemplo del formato
                      ['jesus', 43.3, 85.8, 93.7, 50.5],
                      ['kevin', 83.1, 73.4, 55.1, 50.5],
                      ['arturo', 86.4, 65.2, 82.5, 50.5],
                      ['Total', 72.4, 53.9, 39.1, 50.5],
          */
          ],
        },
        xAxis: {},
        yAxis: {type: 'category'},
        // Declare several bar series, each will be mapped.
        // to a column of dataset.source by default.
        series: [
          {type: 'bar'},
          {type: 'bar'},
          {type: 'bar'},
        ],
      };

      this.tblDatosCo1TEC.forEach(value => {
        // JSON - PENDIENTES DE FIRMA.
        const chartBarData = [
          value.ESTATUS,
          value.ENLINEA,
          value.FISICO,
          value.VOLANTE,
        ];

        // this.titulos.push(value.name);
        this.chartDataBarrasCo1TEC.dataset.source.push(chartBarData);
      });
    }, error => {
      // Desactivar la animación.
      this.spinnerLoadingCon1TEC = false;

      // Mostrar ventana.
      this.alerta.show('', error, { limit: 1, position: NbGlobalLogicalPosition.TOP_END,
        status: 'danger', preventDuplicates: true, icon: {icon: 'exclamation-triangle', pack: 'font-awesome'}});
    });
  }
  obtenerDatosCon2TEC() {
    // Crear objeto de datos.
    const parametros = {
      'Fecha1': this.Fecha1.toLocaleDateString(),
      'Fecha2': this.Fecha2.toLocaleDateString(),
      'OFICINAID': '4',
    };

    // Activar animación loading.
    this.spinnerLoadingCon2TEC = true;

    // Llamar al controlador y ejecutar la peticion httpRequest.
    this.objServicio.objVolantesAnalizadosController.consultarPendientesCon2PorMunicipio(parametros).pipe(first())
      .subscribe((respuestaServer: any) => {
        // Convertir la respuesta a un objeto JSON.
        this.tblDatosCo2TEC = JSON.parse(respuestaServer);

        // Asignar lista de datos y refrescar pantalla.
        this.tableSourceCon2TEC.load(this.tblDatosCo2TEC);
        this.tableSourceCon2TEC.refresh();
        this.spinnerLoadingCon2TEC = false;
        this.habilitarBotonCSV2 = false;

        // Etiquetas de info, que equivalen a la cantidad de barras.
        this.titulosCo2TEC = ['product', 'En linea', 'Físico', 'Volante'];

        this.chartDataBarrasCo2TEC = {
          legend: {
            text: 'Pendientes de firma',
            subtext: '',
            x: 'center',
          },
          tooltip: {},
          dataset: {
            source: [
              // Etiquetas de info, que equivalen a la cantidad de barras.
              this.titulosCo2TEC,
              // Categoria eje x, valor para la cantidad de barras.
              this.barDataCo2TEC,
              /*
                        Ejemplo del formato
                        ['jesus', 43.3, 85.8, 93.7, 50.5],
                        ['kevin', 83.1, 73.4, 55.1, 50.5],
                        ['arturo', 86.4, 65.2, 82.5, 50.5],
                        ['Total', 72.4, 53.9, 39.1, 50.5],
            */
            ],
          },
          xAxis: {},
          yAxis: {type: 'category'},
          // Declare several bar series, each will be mapped.
          // to a column of dataset.source by default.
          series: [
            {type: 'bar'},
            {type: 'bar'},
            {type: 'bar'},
          ],
        };

        this.tblDatosCo2TEC.forEach(value => {
          // JSON - PENDIENTES DE FIRMA.
          const chartBarData = [
            value.TIPODETRAMITE,
            value.ENLINEA,
            value.FISICO,
            value.VOLANTE,
          ];

          // this.titulos.push(value.name);
          this.chartDataBarrasCo2TEC.dataset.source.push(chartBarData);
        });
      }, error => {
        // Desactivar la animación.
        this.spinnerLoadingCon2TEC = false;

        // Mostrar ventana.
        this.alerta.show('', error, { limit: 1, position: NbGlobalLogicalPosition.TOP_END,
          status: 'danger', preventDuplicates: true, icon: {icon: 'exclamation-triangle', pack: 'font-awesome'}});
      });
  }
  obtenerDatosDetalladoTEC() {
    // Crear objeto de datos.
    const parametros = {
      'Fecha1': this.Fecha1.toLocaleDateString(),
      'Fecha2': this.Fecha2.toLocaleDateString(),
      'OFICINAID': '4',
    };

    // Activar animación loading.
    this.spinnerLoadingDetalladoTEC = true;

    // Llamar al controlador y ejecutar la peticion httpRequest.
    this.objServicio.objVolantesAnalizadosController.consultarPendientesFirma(parametros).pipe(first())
      .subscribe((respuestaServer: any) => {
        // Convertir la respuesta a un objeto JSON.
        this.tblDatosDetalladoTEC = JSON.parse(respuestaServer);

        // Asignar lista de datos y refrescar pantalla.
        this.tableSourceDetalladoTEC.load(this.tblDatosDetalladoTEC);
        this.tableSourceDetalladoTEC.refresh();
        this.spinnerLoadingDetalladoTEC = false;
        this.habilitarBotonCSV3 = false;
      }, error => {
        // Desactivar la animación.
        this.spinnerLoadingDetalladoTEC = false;

        // Mostrar ventana.
        this.alerta.show('', error, { limit: 1, position: NbGlobalLogicalPosition.TOP_END,
          status: 'danger', preventDuplicates: true, icon: {icon: 'exclamation-triangle', pack: 'font-awesome'}});
      });
  }
  downloadCSV(tablaDeDatos, caso) {
    let fileName: string = '';
    const options: any = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      showTitle: true,
      useBom: true,
    };

    switch (caso) {
      case 'Concentrado1':
        fileName = 'va Estatus TEC';
        options.headers = [
          'ID',
          'Estatus',
          'En linea',
          'Físico',
          'Volante',
        ];
        break;
      case 'Concentrado2':
        fileName = 'va Tipo de trámite TEC';
        options.headers = [
          'ID',
          'Tipo de trámite',
          'En linea',
          'Físico',
          'Volante',
        ];
        break;
      case 'Detallado':
        fileName = 'va Detallado TEC';
        options.headers = [
          'Volante',
          'Estatus',
          'Tipo de tramite',
          'Acto',
          'Ultimo movimiento',
          'Origen',
          'Analista',
          'SubRegistrador/Registrador',
        ];
        break;
    }

    tablaDeDatos.getAll().then(data => {
      new Angular5Csv(data, fileName, options);
    });

    // Configurar y mostrar alerta para campos obligatorios.
    this.alerta.show('', 'Reporte generado satisfactoriamente', { limit: 1, position: NbGlobalLogicalPosition.TOP_END,
      destroyByClick: true, status: 'info', preventDuplicates: true, icon: {icon: 'check', pack: 'font-awesome'}});
  }
}
