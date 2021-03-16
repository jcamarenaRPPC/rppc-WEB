import { Component, OnInit } from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {NbGlobalLogicalPosition, NbToastrService} from '@nebular/theme';
import {APIService} from '../../../../../service/apiservice.service';
import {first} from 'rxjs/operators';
import {Angular5Csv} from 'angular5-csv/dist/Angular5-csv';

@Component({
  selector: 'ngx-va-pendientes-tij',
  templateUrl: './vaPendientesTIJ.component.html',
  styleUrls: ['./vaPendientesTIJ.component.scss'],
})

export class VaPendientesTIJComponent implements OnInit {
  // Declarar variables [ngmodel]
  Fecha1 = new Date();
  Fecha2 = new Date();

  // Declarar objetos.
  mensajeLoading: string;
  tblDatosCo1TIJ = [];
  tblDatosCo2TIJ = [];
  tblDatosDetalladoTIJ = [];

  // Declarar spinnners.
  spinnerLoadingCon1TIJ: any;
  spinnerLoadingCon2TIJ: any;
  spinnerLoadingDetalladoTIJ: any;

  // Grafica de barras co1.
  chartDataBarrasCo1TIJ: any;
  barDataCo1TIJ = [];
  titulosCo1TIJ = [];

  // Grafica de barras co2.
  chartDataBarrasCo2TIJ: any;
  barDataCo2TIJ = [];
  titulosCo2TIJ = [];

  // Habilitar boton excel.
  habilitarBotonCSV1: boolean = true;
  habilitarBotonCSV2: boolean = true;
  habilitarBotonCSV3: boolean = true;

  tableSourceCon1TIJ: LocalDataSource;
  tableSourceCon2TIJ: LocalDataSource;
  tableSourceDetalladoTIJ: LocalDataSource;

  // Crear la configuración para la tabla de datos.
  tableConfigCon1TIJ = {
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
  tableConfigCon2TIJ = {
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
  tableConfigDetalladoTIJ = {
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
    this.tableSourceCon1TIJ = new LocalDataSource(this.tblDatosCo1TIJ);
    this.tableSourceCon2TIJ = new LocalDataSource(this.tblDatosCo2TIJ);
    this.tableSourceDetalladoTIJ = new LocalDataSource(this.tblDatosDetalladoTIJ);
  }

  ngOnInit(): void {
  }

  obtenerDatosCon1TIJ() {
    // Crear objeto de datos.
    const parametros = {
      'Fecha1': this.Fecha1.toLocaleDateString(),
      'Fecha2': this.Fecha2.toLocaleDateString(),
      'OFICINAID': '2',
    };

    // Activar animación loading.
    this.spinnerLoadingCon1TIJ = true;

    // Llamar al controlador y ejecutar la peticion httpRequest.
    this.objServicio.objVolantesAnalizadosController.consultarPendientesCon1PorMunicipio(parametros).pipe(first()).
    subscribe((respuestaServer: any) => {
      // Convertir la respuesta a un objeto JSON.
      this.tblDatosCo1TIJ = JSON.parse(respuestaServer);

      // Asignar lista de datos y refrescar pantalla.
      this.tableSourceCon1TIJ.load(this.tblDatosCo1TIJ);
      this.tableSourceCon1TIJ.refresh();
      this.spinnerLoadingCon1TIJ = false;
      this.habilitarBotonCSV1 = false;

      // Etiquetas de info, que equivalen a la cantidad de barras.
      this.titulosCo1TIJ = ['product', 'En linea', 'Físico', 'Volante'];

      this.chartDataBarrasCo1TIJ = {
        legend: {
          text: 'Pendientes de firma',
          subtext: '',
          x: 'center',
        },
        tooltip: {},
        dataset: {
          source: [
            // Etiquetas de info, que equivalen a la cantidad de barras.
            this.titulosCo1TIJ,
            // Categoria eje x, valor para la cantidad de barras.
            this.barDataCo1TIJ,
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

      this.tblDatosCo1TIJ.forEach(value => {
        // JSON - PENDIENTES DE FIRMA.
        const chartBarData = [
          value.ESTATUS,
          value.ENLINEA,
          value.FISICO,
          value.VOLANTE,
        ];

        // this.titulos.push(value.name);
        this.chartDataBarrasCo1TIJ.dataset.source.push(chartBarData);
      });
    }, error => {
      // Desactivar la animación.
      this.spinnerLoadingCon1TIJ = false;

      // Mostrar ventana.
      this.alerta.show('', error, { limit: 1, position: NbGlobalLogicalPosition.TOP_END,
        status: 'danger', preventDuplicates: true, icon: {icon: 'exclamation-triangle', pack: 'font-awesome'}});
    });
  }
  obtenerDatosCon2TIJ() {
    // Crear objeto de datos.
    const parametros = {
      'Fecha1': this.Fecha1.toLocaleDateString(),
      'Fecha2': this.Fecha2.toLocaleDateString(),
      'OFICINAID': '2',
    };

    // Activar animación loading.
    this.spinnerLoadingCon2TIJ = true;

    // Llamar al controlador y ejecutar la peticion httpRequest.
    this.objServicio.objVolantesAnalizadosController.consultarPendientesCon2PorMunicipio(parametros).pipe(first())
      .subscribe((respuestaServer: any) => {
        // Convertir la respuesta a un objeto JSON.
        this.tblDatosCo2TIJ = JSON.parse(respuestaServer);

        // Asignar lista de datos y refrescar pantalla.
        this.tableSourceCon2TIJ.load(this.tblDatosCo2TIJ);
        this.tableSourceCon2TIJ.refresh();
        this.spinnerLoadingCon2TIJ = false;
        this.habilitarBotonCSV2 = false;

        // Etiquetas de info, que equivalen a la cantidad de barras.
        this.titulosCo2TIJ = ['product', 'En linea', 'Físico', 'Volante'];

        this.chartDataBarrasCo2TIJ = {
          legend: {
            text: 'Pendientes de firma',
            subtext: '',
            x: 'center',
          },
          tooltip: {},
          dataset: {
            source: [
              // Etiquetas de info, que equivalen a la cantidad de barras.
              this.titulosCo2TIJ,
              // Categoria eje x, valor para la cantidad de barras.
              this.barDataCo2TIJ,
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

        this.tblDatosCo2TIJ.forEach(value => {
          // JSON - PENDIENTES DE FIRMA.
          const chartBarData = [
            value.TIPODETRAMITE,
            value.ENLINEA,
            value.FISICO,
            value.VOLANTE,
          ];

          // this.titulos.push(value.name);
          this.chartDataBarrasCo2TIJ.dataset.source.push(chartBarData);
        });
      }, error => {
        // Desactivar la animación.
        this.spinnerLoadingCon2TIJ = false;

        // Mostrar ventana.
        this.alerta.show('', error, { limit: 1, position: NbGlobalLogicalPosition.TOP_END,
          status: 'danger', preventDuplicates: true, icon: {icon: 'exclamation-triangle', pack: 'font-awesome'}});
      });
  }
  obtenerDatosDetalladoTIJ() {
    // Crear objeto de datos.
    const parametros = {
      'Fecha1': this.Fecha1.toLocaleDateString(),
      'Fecha2': this.Fecha2.toLocaleDateString(),
      'OFICINAID': '2',
    };

    // Activar animación loading.
    this.spinnerLoadingDetalladoTIJ = true;

    // Llamar al controlador y ejecutar la peticion httpRequest.
    this.objServicio.objVolantesAnalizadosController.consultarPendientesFirma(parametros).pipe(first())
      .subscribe((respuestaServer: any) => {
        // Convertir la respuesta a un objeto JSON.
        this.tblDatosDetalladoTIJ = JSON.parse(respuestaServer);

        // Asignar lista de datos y refrescar pantalla.
        this.tableSourceDetalladoTIJ.load(this.tblDatosDetalladoTIJ);
        this.tableSourceDetalladoTIJ.refresh();
        this.spinnerLoadingDetalladoTIJ = false;
        this.habilitarBotonCSV3 = false;
      }, error => {
        // Desactivar la animación.
        this.spinnerLoadingDetalladoTIJ = false;

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
        fileName = 'va Estatus TIJ';
        options.headers = [
          'ID',
          'Estatus',
          'En linea',
          'Físico',
          'Volante',
        ];
        break;
      case 'Concentrado2':
        fileName = 'va Tipo de trámite TIJ';
        options.headers = [
          'ID',
          'Tipo de trámite',
          'En linea',
          'Físico',
          'Volante',
        ];
        break;
      case 'Detallado':
        fileName = 'va Detallado TIJ';
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
