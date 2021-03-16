import { Component, OnInit } from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {NbToastrService} from '@nebular/theme';
import {APIService} from '../../../../service/apiservice.service';
import {first} from 'rxjs/operators';

@Component({
  selector: 'ngx-detalladoporestado',
  templateUrl: './DetalladoPorEstado.component.html',
  styleUrls: ['./DetalladoPorEstado.component.scss'],
})
export class DetalladoPorEstadoComponent implements OnInit {
  // Declarar variables [ngmodel]
  Fecha1 = new Date();
  Fecha2 = new Date();

  // Declarar objetos.
  mensajeLoading: string;
  tblDatos = [];

  // Arrays para las graficas.
  chartDataInscripcionesEnLinea: any;
  chartDataInscripcionesFisicas: any;
  chartDataTotalInscripciones: any;
  chartDataAvisosEnLinea: any;
  chartDataAvisosFisicos: any;
  chartDataTotalAvisos: any;
  chartDataTotalEnLinea: any;
  chartDataTotalFisicos: any;
  chartDataTotal: any;

  // Declarar spinnners.
  spinnerLoadingGraficas: any;
  spinnerLoadingTabla: any;


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
      MUNICIPIO: {
        title: 'Municipio',
        filter: false,
      },
      INSENLINEA: {
        title: 'INSCR. LINEA',
        filter: false,
      },
      INSFISICAS: {
        title: 'INSCR. FISICAS',
        filter: false,
      },
      INSCRIPCIONES: {
        title: 'INSCRIPCIONES',
        filter: false,
      },
      AVENLINEA: {
        title: 'AVISOS EN LINEA',
        filter: false,
      },
      AVFISICOS: {
        title: 'AVISOS FISICOS',
        filter: false,
      },
      AVISOS: {
        title: 'AVISOS',
        filter: false,
      },
      ENLINEA: {
        title: 'EN LINEA',
        filter: false,
      },
      FISICOS: {
        title: 'FISICOS',
        filter: false,
      },
      TOTAL: {
        title: 'TOTAL',
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
    // Datos de graficas.
    const chartDataInscripcionesEnLinea: any = [];
    const chartDataInscripcionesFisicos: any = [];
    const chartDataAvisosEnLinea: any = [];
    const chartDataAvisosFisicos: any = [];

    // totales para graficas.
    let totalInscripcionesEnLinea: any;
    let totalInscripcionesFisicos: any;
    let totalAvisosEnLinea: any;
    let totalAvisosFisicos: any;


    // Crear objeto de datos.
    const parametros = {
/*
      'OFICINAID': '1',
*/
      'Fecha1': this.Fecha1.toLocaleDateString(),
      'Fecha2': this.Fecha2.toLocaleDateString(),
    };

    // Activar animación loading.
    this.spinnerLoadingGraficas = true;
    this.spinnerLoadingTabla = true;

    // Llamar al controlador y ejecutar la peticion httpRequest.
    this.objServicio.objNotariosController.DetalladoPorEstado(parametros).pipe(first()).subscribe((respuestaServer: any) => {
      // Convertir la respuesta a un objeto JSON.
      this.tblDatos = JSON.parse(respuestaServer);

      // Recorrer respuesta para crear JSON para cada gráfica.
      this.tblDatos.forEach(function (value, key) {
        if (value.MUNICIPIO !== 'ESTADO') {
          // JSON - INSCRIPCIONES EN LINEA.
          let objchartDataInscripcionesEnLinea: any = {
            name: value.MUNICIPIO,
            value: value.INSENLINEA,
          };
          // JSON - INSCRIPCIONES FISICAS.
          let objchartDataInscripcionesFisicos: any = {
            name: value.MUNICIPIO,
            value: value.INSFISICAS,
          };
          // JSON - AVISOS EN LINEA.
          let objchartDataAvisosEnLinea: any = {
            name: value.MUNICIPIO,
            value: value.AVENLINEA,
          };
          // JSON - INSCRIPCIONES FISICAS.
          let objchartDataAvisosFisicos: any = {
            name: value.MUNICIPIO,
            value: value.AVFISICOS,
          };

          // Asignar los datos del JSON creado al objeto.
          chartDataInscripcionesEnLinea.push(objchartDataInscripcionesEnLinea);
          chartDataInscripcionesFisicos.push(objchartDataInscripcionesFisicos);
          chartDataAvisosEnLinea.push(objchartDataAvisosEnLinea);
          chartDataAvisosFisicos.push(objchartDataAvisosFisicos);

          // Limpiar objetos.
          objchartDataInscripcionesEnLinea = null;
          objchartDataInscripcionesFisicos = null;
          objchartDataAvisosEnLinea = null;
          objchartDataAvisosFisicos = null;
        } else {
          // JSON - INSCRIPCIONES TOTALES.
          totalInscripcionesEnLinea = value.INSENLINEA;
          totalInscripcionesFisicos = value.INSFISICAS;
          // JSON - AVISOS TOTALES.
          totalAvisosEnLinea = value.AVENLINEA;
          totalAvisosFisicos = value.AVFISICOS;
/*
          chartDataEstatalAnalistas.push({name: 'Asignados para análisis', value: value.ASIGNADOSPARAANALISIS});
          chartDataEstatalAnalistas.push({name: 'En análisis', value: value.ENANALISIS});
          chartDataEstatalAnalistas.push({name: 'Analizados', value: value.ANALIZADOS});
*/
        }
      });

      // Construir opciones para las graficas.
      // INSCRIPCIONES.
      this.chartDataInscripcionesEnLinea = {
        title: {
          text: 'Inscripciones en linea\n' + 'Total: ' + totalInscripcionesEnLinea,
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
          data: chartDataInscripcionesEnLinea.name,
        },
        series: [
          {
            name: 'Access Sources',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: chartDataInscripcionesEnLinea,
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
      this.chartDataInscripcionesFisicas = {
        title: {
          text: 'Inscripciones físicas\n' + 'Total: ' + totalInscripcionesFisicos,
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
          data: chartDataInscripcionesFisicos.name,
        },
        series: [
          {
            name: 'Access Sources',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: chartDataInscripcionesFisicos,
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
      // AVISOS.
      this.chartDataAvisosEnLinea = {
        title: {
          text: 'Avisos en linea\n' + 'Total: ' + totalAvisosEnLinea,
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
          data: chartDataAvisosEnLinea.name,
        },
        series: [
          {
            name: 'Access Sources',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: chartDataAvisosEnLinea,
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
      this.chartDataAvisosFisicos = {
        title: {
          text: 'Avisos físicos\n' + 'Total: ' + totalAvisosFisicos,
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
          data: chartDataAvisosFisicos.name,
        },
        series: [
          {
            name: 'Access Sources',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: chartDataAvisosFisicos,
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

      // Asignar lista de datos y refrescar la tabla.
      this.tableSource.load(this.tblDatos);
      this.tableSource.refresh();

      // Desactivar la animación.
      this.spinnerLoadingGraficas = false;
      this.spinnerLoadingTabla = false;
    }, error => {
      // Desactivar la animación.
      this.spinnerLoadingGraficas = false;
      this.spinnerLoadingTabla = false;

      // Mostrar ventana.
      this.alerta.danger(error, 'Alerta');
    });
  }
}
