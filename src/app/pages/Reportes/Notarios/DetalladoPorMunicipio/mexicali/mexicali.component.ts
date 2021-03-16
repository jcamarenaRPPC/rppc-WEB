import { Component, OnInit } from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {NbToastrService} from '@nebular/theme';
import {APIService} from '../../../../../service/apiservice.service';
import {first} from 'rxjs/operators';

@Component({
  selector: 'ngx-mexicali',
  templateUrl: './mexicali.component.html',
  styleUrls: ['./mexicali.component.scss'],
})
export class MexicaliComponent implements OnInit {
// Declarar variables [ngmodel]
  Fecha1 = new Date();
  Fecha2 = new Date();

  // Declarar objetos.
  tblDatos = [];
  tableSource: LocalDataSource;
  mensajeLoading: string;

  // Arrays para las graficas.
  chartDataInscripciones: any;
  chartDataAvisos: any;
  chartDataTotalInscripciones: any;
  chartDataTotalAvisos: any;
  chartDataTotales: any;

  // Grafica de barras.
  chartDataBarras: any;
  barData = [];
  titulos = [];

  // Declarar spinnners.
  spinnerLoadingGraficas: any;
  spinnerLoadingTabla: any;

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
      NOTARIA: {
        title: 'NOTARIA',
        filter: true,
      },
      USUARIO: {
        title: 'USUARIO',
        filter: true,
      },
      INSCRIPCIONES: {
        title: 'INSCRIPCIONES',
        filter: true,
      },
      AVISOS: {
        title: 'AVISOS',
        filter: true,
      },
      TOTAL: {
        title: 'TOTAL',
        filter: true,
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
    const chartDataInscripciones: any = [];
    const chartDataAvisos: any = [];
    const chartDataTotales: any = [];

    // totales para graficas.
    let totalInscripciones: any;
    let totalAvisos: any;

    // Crear objeto de datos.
    const parametros = {
      'MunicipioID': '1',
      'Fecha1': this.Fecha1.toLocaleDateString(),
      'Fecha2': this.Fecha2.toLocaleDateString(),
    };

    // Activar animación loading.
    this.spinnerLoadingGraficas = true;
    this.spinnerLoadingTabla = true;

    // Llamar al controlador y ejecutar la peticion httpRequest.
    this.objServicio.objNotariosController.DetalladoPorMunicipio(parametros).pipe(first()).subscribe((respuestaServer: any) => {
      // Convertir la respuesta del API a un objeto JSON.
      this.tblDatos = JSON.parse(respuestaServer);

      // Recorrer respuesta para crear JSON para cada gráfica.
      this.tblDatos.forEach(function (value, key) {
        if (value.NOTARIA === 0) {
          // JSON - INSCRIPCIONES.
          chartDataTotales.push({name: 'Físicos', value: value.FISICOS});
          chartDataTotales.push({name: 'En linea', value: value.ENLINEA});
          chartDataInscripciones.push({name: 'Físicos', value: value.INSFISICAS});
          chartDataInscripciones.push({name: 'En linea', value: value.INSENLINEA});
          totalInscripciones = value.INSCRIPCIONES2;
          chartDataAvisos.push({name: 'Físicos', value: value.AVFISICOS});
          chartDataAvisos.push({name: 'En linea', value: value.AVENLINEA});
          totalAvisos = value.AVISOS2;
        }
      });

      // Construir arreglo de opciones para las graficas de pie.
      // INSCRIPCIONES.
      this.chartDataInscripciones = {
        title: {
          text: 'Inscripciones\n' + 'Total: ' + totalInscripciones,
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
          data: chartDataInscripciones.name,
        },
        series: [
          {
            name: 'Access Sources',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: chartDataInscripciones,
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
      this.chartDataAvisos = {
        title: {
          text: 'Avisos\n' + 'Total: ' + totalAvisos,
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
          data: chartDataAvisos.name,
        },
        series: [
          {
            name: 'Access Sources',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: chartDataAvisos,
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
      // TOTALES.
      this.chartDataTotales = {
        title: {
          text: 'Volantes ingresados (Inscripciones y Avisos)',
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
          data: chartDataAvisos.name,
        },
        series: [
          {
            name: 'Access Sources',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: chartDataTotales,
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

      // Construir opciones para la grafica de barras.
      // Etiquetas de info, que equivalen a la cantidad de barras, aparecen arriba de la gráfica.
      this.titulos = ['product', 'Inscripciones', 'Avisos'];

      // Construir el arreglo de opciones para la grafica de barras.
      this.chartDataBarras = {
        legend: {
          text: '',
          subtext: '',
          x: 'center',
        },
        tooltip: {},
        dataset: {
          source: [
            // Etiquetas de info, que equivalen a la cantidad de barras, aparecen arriba de la gráfica.
            this.titulos,
            // Categoria eje x, valor para la cantidad de barras, se debe de declarar una variable sin importar que este vacía,
            // de lo contrario marca error porque siempre espera un objeto.
            this.barData,

          ],
        },
        xAxis: {type: 'category', name: 'NOTARIAS', nameLocation: 'middle', nameGap: 30,
          nameTextStyle: {fontWeight: 'bold', fontSize: 20, fontFamily: 'calibri'}},
        yAxis: {type: 'value', name: 'VOLANTES', nameLocation: 'middle', nameGap: 60,
          nameTextStyle: {fontWeight: 'bold', fontSize: 20,  fontFamily: 'calibri'}},
        series: [
          // Declarar las barras que se van a ligar y mapear a los datos.
          {
            type: 'bar',
            label: {normal: {show: true, position: 'top', fontSize: 12, color: 'black'}},
          },
          {
            type: 'bar',
            label: {normal: {show: true, position: 'top', fontSize: 12, color: 'black'}},
          },
        ],
      };

      // Construir el objeto que se va a mapear a la cantidad de barras declaradas.
      this.tblDatos.forEach(value => {
        // Validar que el usuario no contenga el dato 'Total',
        // ya que esto representa el total y no queremos que se muestre en la gráfica como barra.
        if (value.USUARIO !== 'Total' && value.NOTARIA !== 0) {
          // JSON - Data para las barras.
          const chartBarData = [
            value.NOTARIA, // Eje x
            value.INSCRIPCIONES, // Dato 1 para la barra.
            value.AVISOS, // Dato 2 para la barra.
          ];

          // Asignar la data para cada barra al objeto de la gráfica.
          this.chartDataBarras.dataset.source.push(chartBarData);
        }
      }),

      // Quitar el ultimo renglon antes de pegar los datos a la tabla.
      // Sirve solamente para armar las graficas.
      this.tblDatos.splice(this.tblDatos.length - 1, 1);

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
