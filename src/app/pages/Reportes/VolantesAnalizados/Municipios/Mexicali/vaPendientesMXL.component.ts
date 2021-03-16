import { Component, OnInit } from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {NbGlobalLogicalPosition, NbToastrService} from '@nebular/theme';
import {APIService} from '../../../../../service/apiservice.service';
import {first} from 'rxjs/operators';
import {Angular5Csv} from 'angular5-csv/dist/Angular5-csv';


@Component({
  selector: 'ngx-va-pendientes',
  templateUrl: './vaPendientesMXL.component.html',
  styleUrls: ['./vaPendientesMXL.component.scss'],
})

export class VaPendientesMXLComponent implements OnInit {
  // chart options.
  view: any[] = [700, 400];
  isDoughnut: boolean = false;
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'],
  };
  chartData: any;

  // Declarar variables [ngmodel]
  Fecha1 = new Date();
  Fecha2 = new Date();
  botonExcelPrecionado: string = '';

  // Declarar objetos.
  mensajeLoading: string;
  tblDatosCo1MXL = [];
  tblDatosCo2MXL = [];
  tblDatosDetalladoMXL = [];

  // Grafica de barras co1.
  chartDataBarrasCo1MXL: any;
  barDataCo1MXL = [];
  titulosCo1MXL = [];

  // Grafica de barras co2.
  chartDataBarrasCo2MXL: any;
  barDataCo2MXL = [];
  titulosCo2MXL = [];

  // Declarar spinnners.
  spinnerLoadingCon1MXL: any;
  spinnerLoadingCon2MXL: any;
  spinnerLoadingDetalladoMXL: any;

  // Crear instancia de datos para las tablas.
  tableSourceCon1MXL: LocalDataSource;
  tableSourceCon2MXL: LocalDataSource;
  tableSourceDetalladoMXL: LocalDataSource;

  // Habilitar boton excel.
  habilitarBotonCSV1: boolean = true;
  habilitarBotonCSV2: boolean = true;
  habilitarBotonCSV3: boolean = true;

  // Crear la configuración para la tabla de datos.
  tableConfigCon1MXL = {
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
      ESTATUS: {title: 'Estatus', filter: false},
      ENLINEA: {title: 'En linea', filter: false},
      FISICO: {title: 'Físico', filter: false},
      VOLANTE: {title: 'Volante', filter: false},
    },
  };
  tableConfigCon2MXL = {
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
      TIPODETRAMITE: {title: 'Tipo de trámite', filter: false},
      ENLINEA: {title: 'En linea', filter: false},
      FISICO: {title: 'Físico', filter: false},
      VOLANTE: {title: 'Volante', filter: false},
    },
  };
  tableConfigDetalladoMXL = {
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
      VOLANTE: {title: 'Volante'},
      ESTATUS: {title: 'Estatus'},
      TIPODETRAMITE: {title: 'Tipo de trámite'},
      ACTO: {title: 'Acto'},
      ULTIMOMOVIMIENTO: {title: 'Ultimo movimiento'},
      ORIGEN: {title: 'Origen'},
      ANALISTA: {title: 'Analista'},
      SUBREGISTRADORREGISTRADOR: {title: 'Subregistrador/Registrador'},
    },
  };

  constructor(private alerta: NbToastrService, private objServicio: APIService) {
    // Inicializar objetos mexicali.
    this.tableSourceCon1MXL = new LocalDataSource(this.tblDatosCo1MXL);
    this.tableSourceCon2MXL = new LocalDataSource(this.tblDatosCo2MXL);
    this.tableSourceDetalladoMXL = new LocalDataSource(this.tblDatosDetalladoMXL);
  }

  ngOnInit(): void {
  }

  obtenerDatosCon1MXL() {
    // Crear objeto de datos.
    const parametros = {
      'Fecha1': this.Fecha1.toLocaleDateString(),
      'Fecha2': this.Fecha2.toLocaleDateString(),
      'OFICINAID': '1',
    };

    // Activar animación loading.
    this.spinnerLoadingCon1MXL = true;

    // Llamar al controlador y ejecutar la peticion httpRequest.
    this.objServicio.objVolantesAnalizadosController.consultarPendientesCon1PorMunicipio(parametros).pipe(first()).
    subscribe((respuestaServer: any) => {
      // Convertir la respuesta a un objeto JSON.
      this.tblDatosCo1MXL = JSON.parse(respuestaServer);
      this.chartData = respuestaServer;

      // Asignar lista de datos y refrescar pantalla.
      this.tableSourceCon1MXL.load(this.tblDatosCo1MXL);
      this.tableSourceCon1MXL.refresh();
      this.spinnerLoadingCon1MXL = false;
      this.habilitarBotonCSV1 = false;

      // Etiquetas de info, que equivalen a la cantidad de barras.
      this.titulosCo1MXL = ['product', 'En linea', 'Físico', 'Volante'];

      this.chartDataBarrasCo1MXL = {
        legend: {
          text: 'Pendientes de firma',
          subtext: '',
          x: 'center',
        },
        tooltip: {},
        dataset: {
          source: [
            // Etiquetas de info, que equivalen a la cantidad de barras.
            this.titulosCo1MXL,
            // Categoria eje x, valor para la cantidad de barras.
            this.barDataCo1MXL,
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

      this.tblDatosCo1MXL.forEach(value => {
        // JSON - PENDIENTES DE FIRMA.
        const chartBarData = [
          value.ESTATUS,
          value.ENLINEA,
          value.FISICO,
          value.VOLANTE,
        ];

        // this.titulos.push(value.name);
        this.chartDataBarrasCo1MXL.dataset.source.push(chartBarData);
      });
    }, error => {
      // Desactivar la animación.
      this.spinnerLoadingCon1MXL = false;

      // Mostrar ventana.
      this.alerta.show('', error, { limit: 1, position: NbGlobalLogicalPosition.TOP_END,
        status: 'danger', preventDuplicates: true, icon: {icon: 'exclamation-triangle', pack: 'font-awesome'}});
    });
  }
  obtenerDatosCon2MXL() {
    // Crear objeto de datos.
    const parametros = {
      'OFICINAID': '1', 'Fecha1': this.Fecha1.toLocaleDateString(), 'Fecha2': this.Fecha2.toLocaleDateString(),
    };

    // Activar animación loading.
    this.spinnerLoadingCon2MXL = true;

    // Llamar al controlador y ejecutar la peticion httpRequest.
    this.objServicio.objVolantesAnalizadosController.consultarPendientesCon2PorMunicipio(parametros).pipe(first())
      .subscribe((respuestaServer: any) => {
      // Convertir la respuesta a un objeto JSON.
      this.tblDatosCo2MXL = JSON.parse(respuestaServer);

      // Asignar lista de datos y refrescar pantalla.
      this.tableSourceCon2MXL.load(this.tblDatosCo2MXL);
      this.tableSourceCon2MXL.refresh();
      this.spinnerLoadingCon2MXL = false;
      this.habilitarBotonCSV2 = false;

      // Etiquetas de info, que equivalen a la cantidad de barras.
      this.titulosCo2MXL = ['product', 'En linea', 'Físico', 'Volante'];

      this.chartDataBarrasCo2MXL = {
        legend: {
          text: 'Pendientes de firma',
          subtext: '',
          x: 'center',
        },
        tooltip: {},
        dataset: {
          source: [
            // Etiquetas de info, que equivalen a la cantidad de barras.
            this.titulosCo2MXL,
            // Categoria eje x, valor para la cantidad de barras.
            this.barDataCo2MXL,
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

      this.tblDatosCo2MXL.forEach(value => {
        // JSON - PENDIENTES DE FIRMA.
        const chartBarData = [
          value.TIPODETRAMITE,
          value.ENLINEA,
          value.FISICO,
          value.VOLANTE,
        ];

        // this.titulos.push(value.name);
        this.chartDataBarrasCo2MXL.dataset.source.push(chartBarData);
      });
    }, error => {
      // Desactivar la animación.
      this.spinnerLoadingCon2MXL = false;

      // Mostrar ventana.
      this.alerta.show('', error, { limit: 1, position: NbGlobalLogicalPosition.TOP_END,
        status: 'danger', preventDuplicates: true, icon: {icon: 'exclamation-triangle', pack: 'font-awesome'}});
    });
  }
  obtenerDatosDetalladoMXL() {
    // Crear objeto de datos.
    const parametros = {
      'Fecha1': this.Fecha1.toLocaleDateString(),
      'Fecha2': this.Fecha2.toLocaleDateString(),
      'OFICINAID': '1',
    };

    // Activar animación loading.
    this.spinnerLoadingDetalladoMXL = true;

    // Llamar al controlador y ejecutar la peticion httpRequest.
    this.objServicio.objVolantesAnalizadosController.consultarPendientesFirma(parametros).pipe(first())
      .subscribe((respuestaServer: any) => {
      // Convertir la respuesta a un objeto JSON.
      this.tblDatosDetalladoMXL = JSON.parse(respuestaServer);

      // Asignar lista de datos y refrescar pantalla.
      this.tableSourceDetalladoMXL.load(this.tblDatosDetalladoMXL);
      this.tableSourceDetalladoMXL.refresh();
      this.spinnerLoadingDetalladoMXL = false;
      this.habilitarBotonCSV3 = false;
    }, error => {
      // Desactivar la animación.
      this.spinnerLoadingDetalladoMXL = false;

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
        fileName = 'va Estatus MXL';
        options.headers = [
          'ID',
          'Estatus',
          'En linea',
          'Físico',
          'Volante',
        ];
        break;
      case 'Concentrado2':
        fileName = 'va Tipo de trámite MXL';
        options.headers = [
          'ID',
          'Tipo de trámite',
          'En linea',
          'Físico',
          'Volante',
        ];
        break;
      case 'Detallado':
        fileName = 'va Detallado MXL';
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
