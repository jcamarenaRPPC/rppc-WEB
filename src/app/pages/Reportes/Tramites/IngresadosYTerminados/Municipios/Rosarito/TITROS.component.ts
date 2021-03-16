import { Component, OnInit } from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {NbGlobalLogicalPosition, NbToastrService} from '@nebular/theme';
import {APIService} from '../../../../../../service/apiservice.service';
import {first} from 'rxjs/operators';

@Component({
  selector: 'ngx-titros',
  templateUrl: './TITROS.component.html',
  styleUrls: ['./TITROS.component.scss'],
})
export class TITROSComponent implements OnInit {
  // Declarar variables [ngmodel]
  Fecha1 = new Date();
  Fecha2 = new Date();

  // Declarar objetos.
  mensajeLoading: string;
  tblDatos = [];

  // Trámites gráficas.
  chartDataIngresados: any;
  chartDataFirmados: any;
  chartDataEnDigitalizacion: any;
  chartDataEnParaEntregaEntregado: any;

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
    columns: {
      TRAMITE: {
        title: 'Trámite',
        filter: false,
      },
      CANTIDAD: {
        title: 'Ingresados',
        filter: false,
      },
      FIRMADO: {
        title: 'Firmados',
        filter: false,
      },
      ENDIGITALIZACION: {
        title: 'En digitalización',
        filter: false,
      },
      PARAENTREGAENTREGADO: {
        title: 'Para entrega/entregado',
        filter: false,
      },
    },
  };

  constructor(private alerta: NbToastrService, private objServicio: APIService) {
    // Inicializar objetos.
    this.tableSource = new LocalDataSource(this.tblDatos);
  }

  ngOnInit(): void {
  }

  obtenerDatos() {
    // Tramites ingresados y terminados.
    let chartDataIngresados: any = [];
    let chartDataFirmados: any = [];
    let chartDataEnDigitalizacion: any = [];
    let chartDataParaEntregaEntregado: any = [];

    // Tramites ingresados y terminados totales en gráficas.
    let totalIngresados: any;
    let totalFirmados: any;
    let totalEnDigitalizacion: any;
    let totalParaEntregaEntregado: any;

    // Crear objeto de datos.
    const parametros = {
      'MUNICIPIOID': '5',
      'Fecha1': this.Fecha1.toLocaleDateString(),
      'Fecha2': this.Fecha2.toLocaleDateString(),
    };

    // Activar animación loading.
    this.spinnerLoading = true;

    // Llamar al controlador y ejecutar la peticion httpRequest.
    this.objServicio.objTramitesController.consultarPorMunicipio(parametros).pipe(first()).subscribe((respuestaServer: any) => {
      // Convertir la respuesta a un objeto JSON.
      this.tblDatos = JSON.parse(respuestaServer);

      // Asignar lista de datos y refrescar pantalla.
      this.tableSource.load(this.tblDatos);
      this.tableSource.refresh();
      this.spinnerLoading = false;

      // Recorrer respuesta para crear JSON para cada gráfica.
      this.tblDatos.forEach(function (value, key) {
        if (value.TRAMITE === 'AVISOS Y ANOTACIONES' || value.TRAMITE === 'CERTIFICADO'
          || value.TRAMITE === 'INSCRIPCIÓN' || value.TRAMITE === 'TOTALES') {
          if (value.TRAMITE === 'TOTALES') {
            // JSON - TOTAL.
            totalIngresados = value.CANTIDAD;
            totalFirmados = value.FIRMADO;
            totalEnDigitalizacion = value.ENDIGITALIZACION;
            totalParaEntregaEntregado = value.PARAENTREGAENTREGADO;
          } else {
            // JSON - INGRESADOS.
            let objchartDataIngresados: any = {
              name: value.TRAMITE,
              value: value.CANTIDAD,
            };
            let objchartDataFirmados: any = {
              name: value.TRAMITE,
              value: value.FIRMADO,
            };
            let objchartDataEnDigitalizacion: any = {
              name: value.TRAMITE,
              value: value.ENDIGITALIZACION,
            };
            let objchartDataParaEntregaEntregado: any = {
              name: value.TRAMITE,
              value: value.PARAENTREGAENTREGADO,
            };

            // Asignar los datos del JSON creado al objeto.
            chartDataIngresados.push(objchartDataIngresados);
            chartDataFirmados.push(objchartDataFirmados);
            chartDataEnDigitalizacion.push(objchartDataEnDigitalizacion);
            chartDataParaEntregaEntregado.push(objchartDataParaEntregaEntregado);

            // Limpiar objetos.
            objchartDataIngresados = null;
            objchartDataFirmados = null;
            objchartDataEnDigitalizacion = null;
            objchartDataParaEntregaEntregado = null;
          }
        } else {
        }
      });

      // Carga de analistas.
      this.chartDataIngresados = {
        title: {
          text: 'Trámites ingresados\n' + 'Total: ' + totalIngresados,
          subtext: '',
          x: 'center',
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: chartDataIngresados.name,
        },
        series: [
          {
            name: 'Access Sources',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: chartDataIngresados,
            label: {
              formatter: '{b} : {c} ({d}%)',
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 1)',
              },
            },
          },
        ],
      };
      this.chartDataFirmados = {
        title: {
          text: 'Trámites firmados\n' + 'Total: ' + totalFirmados,
          subtext: '',
          x: 'center',
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: chartDataIngresados.name,
        },
        series: [
          {
            name: 'Access Sources',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: chartDataFirmados,
            label: {
              formatter: '{b} : {c} ({d}%)',
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 1)',
              },
            },
          },
        ],
      };
      this.chartDataEnDigitalizacion = {
        title: {
          text: 'Trámites en digitalización\n' + 'Total: ' + totalEnDigitalizacion,
          subtext: '',
          x: 'center',
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: chartDataIngresados.name,
        },
        series: [
          {
            name: 'Access Sources',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: chartDataEnDigitalizacion,
            label: {
              formatter: '{b} : {c} ({d}%)',
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 1)',
              },
            },
          },
        ],
      };
      this.chartDataEnParaEntregaEntregado = {
        title: {
          text: 'Trámites para entrega/entregado\n' + 'Total: ' + totalParaEntregaEntregado,
          subtext: '',
          x: 'center',
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: chartDataIngresados.name,
        },
        series: [
          {
            name: 'Access Sources',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: chartDataParaEntregaEntregado,
            label: {
              formatter: '{b} : {c} ({d}%)',
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 1)',
              },
            },
          },
        ],
      };

      chartDataIngresados = null;
      chartDataFirmados = null;
      chartDataEnDigitalizacion = null;
      chartDataParaEntregaEntregado = null;
    }, error => {
      // Desactivar la animación.
      this.spinnerLoading = false;

      // Mostrar ventana.
      this.alerta.show('', error, { limit: 1, position: NbGlobalLogicalPosition.TOP_END,
        status: 'danger', preventDuplicates: true, icon: {icon: 'exclamation-triangle', pack: 'font-awesome'}});
    });
  }
}
