import { Component, OnInit } from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {NbGlobalLogicalPosition, NbToastrService} from '@nebular/theme';
import {APIService} from '../../../../../service/apiservice.service';
import {first} from 'rxjs/operators';

@Component({
  selector: 'ngx-ca-ensenada',
  templateUrl: './caEnsenada.component.html',
  styleUrls: ['./caEnsenada.component.scss'],
})

export class CaEnsenadaComponent implements OnInit {
  // Declarar variables [ngmodel]
  Fecha1 = new Date();
  Fecha2 = new Date();

  // Declarar objetos.
  mensajeLoading: string;
  tblDatos = [];

  // Declarar spinnners.
  spinnerLoading: any;

  // Grafica de barras.
  chartDataBarras: any;
  barData = [];
  titulos = [];

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
      ANALISTA: {
        title: 'Analista',
      },
      ASIGNADOSPARAANALISIS: {
        title: 'Asignado para análisis',
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

  constructor(private alerta: NbToastrService, private objServicio: APIService) {
    // Inicializar objetos.
    this.tableSource = new LocalDataSource(this.tblDatos);
  }

  ngOnInit(): void {
  }

  obtenerDatos() {
    // Crear objeto de datos.
    const parametros = {
      'OFICINAID': '3', 'Fecha1': this.Fecha1.toLocaleDateString(), 'Fecha2': this.Fecha2.toLocaleDateString(),
    };

    // Activar animación loading.
    this.spinnerLoading = true;

    // Llamar al controlador y ejecutar la peticion httpRequest.
    this.objServicio.objCargaAnalistasController.consultarPorMunicipio(parametros).pipe(first()).subscribe((respuestaServer: any) => {
      // Convertir la respuesta a un objeto JSON.
      this.tblDatos = JSON.parse(respuestaServer);

      // Asignar lista de datos y refrescar pantalla.
      this.tableSource.load(this.tblDatos);
      this.tableSource.refresh();
      this.spinnerLoading = false;

      // Etiquetas de info, que equivalen a la cantidad de barras.
      this.titulos = ['product', 'Asignado para análisis', 'En análisis', 'Analizados', 'Total'];

      this.chartDataBarras = {
        legend: {
          text: 'Pendientes de firma',
          subtext: '',
          x: 'center',
        },
        tooltip: {},
        dataset: {
          source: [
            // Etiquetas de info, que equivalen a la cantidad de barras.
            this.titulos,
            // Categoria eje x, valor para la cantidad de barras.
            this.barData,
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
          {type: 'bar'},
        ],
      };

      this.tblDatos.forEach(value => {
        // JSON - PENDIENTES DE FIRMA.
        const chartBarData = [
          value.ANALISTA,
          value.ASIGNADOSPARAANALISIS,
          value.ENANALISIS,
          value.ANALIZADOS,
          value.TOTAL,
        ];

        // this.titulos.push(value.name);
        this.chartDataBarras.dataset.source.push(chartBarData);
      });
    }, error => {
      // Desactivar la animación.
      this.spinnerLoading = false;

      // Mostrar ventana.
      this.alerta.show('', error, { limit: 1, position: NbGlobalLogicalPosition.TOP_END,
        status: 'danger', preventDuplicates: true, icon: {icon: 'exclamation-triangle', pack: 'font-awesome'}});
    });
  }
}
