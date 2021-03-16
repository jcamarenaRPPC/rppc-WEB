import { Component, OnInit } from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {NbToastrService} from '@nebular/theme';
import {APIService} from '../../../service/apiservice.service';
import {first} from 'rxjs/operators';

@Component({
  selector: 'ngx-firmas-diarias',
  templateUrl: './FirmasDiarias.component.html',
  styleUrls: ['./FirmasDiarias.component.scss'],
})
export class FirmasDiariasComponent implements OnInit {
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
      },
      ASIGNADOSPARAANALISIS: {
        title: 'Asignados para análisis',
      },
      ENANALISIS: {
        title: 'En análisis',
      },
      ANALIZADOS: {
        title: 'Analizados',
      },
      TOTAL: {
        title: 'Total',
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

    // Crear objeto de datos.
    const parametros = {
      'Fecha1': this.Fecha1.toLocaleDateString(),
      'Fecha2': this.Fecha2.toLocaleDateString(),
    };

    // Activar animación loading.
    this.spinnerLoading = true;

    // Llamar al controlador y ejecutar la peticion httpRequest.
    this.objServicio.objCargaAnalistasController.consultarTotalizados(parametros).pipe(first()).subscribe((respuestaServer: any) => {
      // Convertir la respuesta a un objeto JSON.
      this.tblDatos = JSON.parse(respuestaServer);

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
          chartDataEstatal.push({name: 'Asignados para análisis', value: value.ASIGNADOSPARAANALISIS});
          chartDataEstatal.push({name: 'En análisis', value: value.ENANALISIS});
          chartDataEstatal.push({name: 'Analizados', value: value.ANALIZADOS});
        }
      });

      // Crear opciones para la gráficas.
      this.chartDataAsignadosParaAnalisis = {
        title: {
          text: 'Asignados para análisis',
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
          text: 'En análisis',
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
          text: 'Analizados',
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
          text: 'Estatal',
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

