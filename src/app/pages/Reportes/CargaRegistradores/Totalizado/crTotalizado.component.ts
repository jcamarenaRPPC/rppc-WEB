import { Component, OnInit } from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {NbToastrService} from '@nebular/theme';
import {APIService} from '../../../../service/apiservice.service';
import {first} from 'rxjs/operators';

@Component({
  selector: 'ngx-reporte1',
  templateUrl: './crTotalizado.component.html',
  styleUrls: ['./crTotalizado.component.scss'],
})
export class CrTotalizadoComponent implements OnInit {
  // Declarar variables [ngmodel]
  Fecha1 = new Date();
  Fecha2 = new Date();

  // Declarar objetos.
  mensajeLoading: string;
  tblDatos = [];

  // Declarar spinnners.
  spinnerLoading: any;
  tableSource: LocalDataSource;

  chartDataPendientesEnFirma: any;
  chartDataFirmados: any;
  chartDataTotal: any;
  chartDataEstatal: any;

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
      MUNICIPIO: {
        title: 'Municipio',
        filter: false,
      },
      PENDIENTESDEFIRMA: {
        title: 'Pendientes de firma',
        filter: false,
      },
      FIRMADOS: {
        title: 'Firmados',
        filter: false,
      },
      TOTAL: {
        title: 'Total',
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
    // Crear objetos para mostrar datos en las gráficas.
    const chartDataPendientesEnFirma: any = [];
    const chartDataFirmados: any = [];
    const chartDataTotal: any = [];
    const chartDataEstatal: any = [];

    // Carga de registradores totales en grafica.
    let totalEstatalPendientesDeFirma: any;
    let totalEstatalFirmados: any;
    let totalRegistradoresEstatalTotal: any;

    // Crear objeto de datos.
    const parametros = {
      'OFICINAID': localStorage.getItem('OficinaID'),
      'Fecha1': this.Fecha1.toLocaleDateString(),
      'Fecha2': this.Fecha2.toLocaleDateString(),
    };

    // Activar animación loading.
    this.spinnerLoading = true;

    // Llamar al controlador y ejecutar la peticion httpRequest.
    this.objServicio.objCargaRegistradoresController.consultarTotalizados(parametros).pipe(first()).subscribe((respuestaServer: any) => {
      // Convertir la respuesta a un objeto JSON.
      this.tblDatos = JSON.parse(respuestaServer);

      // Recorrer respuesta para crear JSON para cada gráfica.
      this.tblDatos.forEach(function (value, key){
        if (value.MUNICIPIO !== 'ESTATAL') {
          // JSON - PENDIENTES DE FIRMA.
          const objchartDataPendientesEnFirma: any = {
            name: value.MUNICIPIO,
            value: value.PENDIENTESDEFIRMA,
          };
          // JSON - FIRMADOS
          const objchartDataFirmados: any = {
            name: value.MUNICIPIO,
            value: value.FIRMADOS,
          };
          // JSON - TOTAL.
          const objchartDataTotal: any = {
            name: value.MUNICIPIO,
            value: value.TOTAL,
          };

          // Asignar los datos del JSON creado al objeto.
          chartDataPendientesEnFirma.push(objchartDataPendientesEnFirma);
          chartDataFirmados.push(objchartDataFirmados);
          chartDataTotal.push(objchartDataTotal);
        }else {
          // JSON - ESTATAL.
          totalEstatalPendientesDeFirma = value.PENDIENTESDEFIRMA;
          totalEstatalFirmados = value.FIRMADOS;
          totalRegistradoresEstatalTotal = value.TOTAL;
          chartDataEstatal.push({name: 'Pendientes de firma', value: value.PENDIENTESDEFIRMA});
          chartDataEstatal.push({name: 'Firmados', value: value.FIRMADOS});
        }
      });

      // Crear la data para la gráficas.
      this.chartDataPendientesEnFirma = {
        title: {
          text: 'Pendientes de firma\n' + 'Total: ' + totalEstatalPendientesDeFirma,
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
          data: chartDataPendientesEnFirma.name,
        },
        series: [
          {
            name: 'Access Sources',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: chartDataPendientesEnFirma,
            label: {
              formatter: '{b} : {c} ({d}%)',
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
          },
        ],
      };
      this.chartDataFirmados = {
        title: {
          text: 'Firmados\n' + 'Total: ' + totalEstatalFirmados,
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
          data: chartDataFirmados.name,
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
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
          },
        ],
      };
      this.chartDataTotal = {
        title: {
          text: 'Total',
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
          data: chartDataTotal.name,
        },
        series: [
          {
            name: 'Access Sources',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: chartDataTotal,
            label: {
              formatter: '{b} : {c} ({d}%)',
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
          },
        ],
      };
      this.chartDataEstatal = {
        title: {
          text: 'Estatal\n' + 'Total: ' + totalRegistradoresEstatalTotal,
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
          data: chartDataEstatal.name,
        },
        series: [
          {
            name: 'Access Sources',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: chartDataEstatal,
            label: {
              formatter: '{b} : {c} ({d}%)',
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
          },
        ],
      };

      // Asignar lista de datos y refrescar pantalla.
      this.tableSource.load(this.tblDatos);
      this.tableSource.refresh();
      this.spinnerLoading = false;
    }, error => {
      // Desactivar la animación.
      this.spinnerLoading = false;

      // Mostrar ventana.
      this.alerta.danger(error, 'Alerta');
    });
  }
}
