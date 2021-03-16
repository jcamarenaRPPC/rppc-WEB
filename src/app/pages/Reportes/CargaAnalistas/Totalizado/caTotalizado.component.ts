import { Component, OnInit } from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {NbToastrService} from '@nebular/theme';
import {APIService} from '../../../../service/apiservice.service';
import {first} from 'rxjs/operators';

@Component({
  selector: 'ngx-ca-totalizado',
  templateUrl: './caTotalizado.component.html',
  styleUrls: ['./caTotalizado.component.scss'],
})
export class CaTotalizadoComponent implements OnInit {
  // Declarar variables [ngmodel]
  Fecha1 = new Date();
  Fecha2 = new Date();

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
    columns: {
      MUNICIPIO: {
        title: 'Municipio',
        filter: false,
      },
      ASIGNADOSPARAANALISIS: {
        title: 'Asignados para análisis',
        filter: false,
      },
      ENANALISIS: {
        title: 'En análisis',
        filter: false,
      },
      ANALIZADOS: {
        title: 'Analizados',
        filter: false,
      },
      TOTAL: {
        title: 'Total',
        filter: false,
      },
    },
  };
  chartDataAsignadosParaAnalisis: any;
  chartDataEnAnalisis: any;
  chartDataAnalizados: any;
  chartDataEstatal: any;

  constructor(private alerta: NbToastrService, private objServicio: APIService) {
    // Inicializar objetos.
    this.tableSource = new LocalDataSource(this.tblDatos);
  }

  ngOnInit(): void {
  }

  obtenerDatos() {
    // Crear objetos para mostrar datos en las gráficas.
    const chartDataAsignadosParaAnalisis: any = [];
    const chartDataEnAnalisis: any = [];
    const chartDataAnalizados: any = [];
    const chartDataEstatal: any = [];

    // Carga de analistas totales en grafica.
    let totalEstatalAsignadoParaAnalisis: any;
    let totalEstatalEnAnalisis: any;
    let totalEstatalAnalizados: any;
    let totalEstatalTotal: any;

    // Crear objeto de datos.
    const parametros = {
      'OFICINAID': localStorage.getItem('OficinaID'),
      'Fecha1': this.Fecha1.toLocaleDateString(),
      'Fecha2': this.Fecha2.toLocaleDateString(),
    };

    // Activar animación loading.
    this.spinnerLoading = true;

    // Llamar al controlador y ejecutar la peticion httpRequest.
    this.objServicio.objCargaAnalistasController.consultarTotalizados(parametros).pipe(first()).subscribe((respuestaServer: any) => {
      // Convertir la respuesta a un objeto JSON.
      this.tblDatos = JSON.parse(respuestaServer);

/*
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
*/

      // Recorrer respuesta para crear JSON para cada gráfica.
      this.tblDatos.forEach(function (value, key){
        if (value.MUNICIPIO !== 'ESTATAL') {
          // JSON - ASIGNADOS PARA ANALIZADOS.
          const objchartDataAsignadosParaAnalisis: any = {
            name: value.MUNICIPIO,
            value: value.ASIGNADOSPARAANALISIS,
          };
          // JSON - EN ANALISIS.
          const objchartDataEnAnalisis: any = {
            name: value.MUNICIPIO,
            value: value.ENANALISIS,
          };
          // JSON - ANALIZADOS.
          const objchartDataAnalizados: any = {
            name: value.MUNICIPIO,
            value: value.ANALIZADOS,
          };

          // Asignar los datos del JSON creado al objeto.
          chartDataAsignadosParaAnalisis.push(objchartDataAsignadosParaAnalisis);
          chartDataEnAnalisis.push(objchartDataEnAnalisis);
          chartDataAnalizados.push(objchartDataAnalizados);
        }else {
          // JSON - ESTATAL.
          totalEstatalAsignadoParaAnalisis = value.ASIGNADOSPARAANALISIS;
          totalEstatalEnAnalisis = value.ENANALISIS;
          totalEstatalAnalizados = value.ANALIZADOS;
          totalEstatalTotal = value.TOTAL;
          chartDataEstatal.push({name: 'Asignados para análisis', value: value.ASIGNADOSPARAANALISIS});
          chartDataEstatal.push({name: 'En análisis', value: value.ENANALISIS});
          chartDataEstatal.push({name: 'Analizados', value: value.ANALIZADOS});
        }
      });

      // Crear opciones para la gráficas.
      this.chartDataAsignadosParaAnalisis = {
        title: {
          text: 'Asignados para análisis\n' + 'Total: ' + totalEstatalAsignadoParaAnalisis,
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
          data: chartDataAsignadosParaAnalisis.name,
        },
        series: [
          {
            name: 'Access Sources',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: chartDataAsignadosParaAnalisis,
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
      this.chartDataEnAnalisis = {
        title: {
          text: 'En análisis\n' + 'Total: ' + totalEstatalEnAnalisis,
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
          data: chartDataEnAnalisis.name,
        },
        series: [
          {
            name: 'Access Sources',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: chartDataEnAnalisis,
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
      this.chartDataAnalizados = {
        title: {
          text: 'Analizados\n' + 'Total: ' + totalEstatalAnalizados,
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
          data: chartDataAnalizados.name,
        },
        series: [
          {
            name: 'Access Sources',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: chartDataAnalizados,
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
          text: 'Estatal\n' + 'Total: ' + totalEstatalTotal,
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
      // this.tableConfig.columns = columnasDinamicasNombre;

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

