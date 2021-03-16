import {Component, OnInit, OnDestroy} from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {NbGlobalLogicalPosition, NbToastrService} from '@nebular/theme';
import {APIService} from '../../service/apiservice.service';
import {first} from 'rxjs/operators';
import html2canvas from 'html2canvas';
import pdfmake from 'pdfmake';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})

export class DashboardComponent implements OnInit, OnDestroy {
  // Declarar variables [ngmodel]
  FechaActual = new Date();
  FechaInicio = new Date();
  FechaFin = new Date();

  // Declarar objetos.
  mensajeLoading: string;
  tblDatos = [];
  municipios: string[] = [];

  // Declarar spinnners.
  spinnerLoadingAnalistas: any;
  spinnerLoadingRegistradores: any;
  tableSource: LocalDataSource;

  // Carga de analistas.
  chartDataAsignadosParaAnalisis: any;
  chartDataEnAnalisis: any;
  chartDataAnalizados: any;
  chartDataEstatalAnalistas: any;

  // Carga de registradores.
  chartDataPendientesDeFirma: any;
  chartDataFirmados: any;
  chartDataTotal: any;
  chartDataEstatalRegistradores: any;

  // Grafica de barras.
  chartDataBarras: any;

  tiempoDeEspera: any;
  isChecked: boolean;
  FilePDF: any;

  constructor(private alerta: NbToastrService, private objServicio: APIService)  {
  }

  ngOnInit(): void {
    // Armar fecha de inicio.
    this.FechaInicio = new Date(this.FechaActual.setDate(this.FechaActual.getDate() - 1));
    this.obtenerDatos();
  }
  ngOnDestroy(): void {
    // Al cerrar la ventana o refrescar la misma, limpiar variables.
    clearInterval(this.tiempoDeEspera);
  }

  obtenerDatos() {
    // Carga de analistas.
    let chartDataAsignadosParaAnalisis: any = [];
    let chartDataEnAnalisis: any = [];
    let chartDataAnalizados: any = [];
    let chartDataEstatalAnalistas: any = [];

    // Carga de analistas totales en grafica.
    let totalEstatalAsignadoParaAnalisis: any;
    let totalEstatalEnAnalisis: any;
    let totalEstatalAnalizados: any;
    let totalEstatalTotal: any;

    // Carga de registradores.
    let chartDataPendientesDeFirma: any = [];
    let chartDataFirmados: any = [];
    let chartDataTotal: any = [];
    let chartDataEstatalRegistradores: any = [];

    // Carga de registradores totales en grafica.
    let totalEstatalPendientesDeFirma: any;
    let totalEstatalFirmados: any;
    let totalRegistradoresEstatalTotal: any;

    const parametros = {
      'Fecha1': this.FechaInicio.toLocaleDateString(),
      'Fecha2': this.FechaFin.toLocaleDateString(),
      'OFICINAID': localStorage.getItem('OficinaID'),
    };

    // Activar animación loading.
    this.spinnerLoadingAnalistas = true;
    this.spinnerLoadingRegistradores = true;
    this.tblDatos = null;

    // Consultar datos para la carga de analistas.
    this.objServicio.objCargaAnalistasController.consultarTotalizados(parametros).pipe(first()).subscribe((respuestaServer: any) => {
      // Convertir la respuesta a un objeto JSON.
      this.tblDatos = JSON.parse(respuestaServer);

      // Recorrer respuesta para crear JSON para cada gráfica.
      this.tblDatos.forEach(function (value, key) {
        if (value.MUNICIPIO !== 'ESTATAL') {
          // JSON - ASIGNADOS PARA ANALIZADOS.
          let objchartDataAsignadosParaAnalisis: any = {
            name: value.MUNICIPIO,
            value: value.ASIGNADOSPARAANALISIS,
          };
          // JSON - EN ANALISIS.
          let objchartDataEnAnalisis: any = {
            name: value.MUNICIPIO,
            value: value.ENANALISIS,
          };
          // JSON - ANALIZADOS.
          let objchartDataAnalizados: any = {
            name: value.MUNICIPIO,
            value: value.ANALIZADOS,
          };

          // Asignar los datos del JSON creado al objeto.
          chartDataAsignadosParaAnalisis.push(objchartDataAsignadosParaAnalisis);
          chartDataEnAnalisis.push(objchartDataEnAnalisis);
          chartDataAnalizados.push(objchartDataAnalizados);

          // Limpiar objetos.
          objchartDataAsignadosParaAnalisis = null;
          objchartDataEnAnalisis = null;
          objchartDataAnalizados = null;
        } else {
          // JSON - ESTATAL.
          totalEstatalAsignadoParaAnalisis = value.ASIGNADOSPARAANALISIS;
          totalEstatalEnAnalisis = value.ENANALISIS;
          totalEstatalAnalizados = value.ANALIZADOS;
          totalEstatalTotal = value.TOTAL;
          chartDataEstatalAnalistas.push({name: 'Asignados para análisis', value: value.ASIGNADOSPARAANALISIS});
          chartDataEstatalAnalistas.push({name: 'En análisis', value: value.ENANALISIS});
          chartDataEstatalAnalistas.push({name: 'Analizados', value: value.ANALIZADOS});
        }
      });

      // Etiquetas de info, que equivalen a la cantidad de barras.
      this.municipios = ['product', 'MEXICALI', 'TIJUANA', 'ENSENADA', 'TECATE', 'ROSARITO'];

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
            this.municipios,
            // Categoria eje x, valor para la cantidad de barras.
            ['Pendientes de firma', '43.3', 85.8, 93.7, 50.5],
            ['Firmados', 83.1, 73.4, 55.1, 50.5],
            ['Total', 86.4, 65.2, 82.5, 50.5],
            ['Estatal', 72.4, 53.9, 39.1, 50.5],
          ],
        },
        xAxis: {type: 'category'},
        yAxis: {},
        // Declare several bar series, each will be mapped.
        // to a column of dataset.source by default.
        series: [
          {type: 'bar'},
          {type: 'bar'},
          {type: 'bar'},
          {type: 'bar'},
        ],
      };

      // Carga de analistas.
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
                shadowColor: 'rgba(0, 0, 0, 1)',
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
                shadowColor: 'rgba(0, 0, 0, 1)',
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
                shadowColor: 'rgba(0, 0, 0, 1)',
              },
            },
          },
        ],
      };
      this.chartDataEstatalAnalistas = {
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
          data: chartDataEstatalAnalistas.name,
        },
        series: [
          {
            name: 'Access Sources',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: chartDataEstatalAnalistas,
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

      chartDataAsignadosParaAnalisis = null;
      chartDataEnAnalisis = null;
      chartDataAnalizados = null;
      chartDataEstatalAnalistas = null;

      this.spinnerLoadingAnalistas = false;
    }, error => {
      // Desactivar la animación.
      this.spinnerLoadingAnalistas = false;

      // Mostrar ventana.
      this.alerta.show('Error al consultar el servidor', 'Carga de analistas' , { limit: 2, position: NbGlobalLogicalPosition.TOP_END,
        status: 'danger', preventDuplicates: false, icon: {icon: 'exclamation-triangle', pack: 'font-awesome'}});
    });

    this.tblDatos = null;
    // Consultar datos para la carga de registradores.
    this.objServicio.objCargaRegistradoresController.consultarTotalizados(parametros).pipe(first()).subscribe((respuestaServer: any) => {
      // Convertir la respuesta a un objeto JSON.
      this.tblDatos = JSON.parse(respuestaServer);

      // Recorrer respuesta para crear JSON para cada gráfica.
      this.tblDatos.forEach(function (value, key) {
        if (value.MUNICIPIO !== 'ESTATAL') {
          // JSON - ASIGNADOS PARA ANALIZADOS.
          let objchartDataPendientesDeFirma: any = {
            name: value.MUNICIPIO,
            value: value.PENDIENTESDEFIRMA,
          };
          // JSON - EN ANALISIS.
          let objchartDataFirmados: any = {
            name: value.MUNICIPIO,
            value: value.FIRMADOS,
          };
          // JSON - ANALIZADOS.
          let objchartDataTotal: any = {
            name: value.MUNICIPIO,
            value: value.TOTAL,
          };

          // Asignar los datos del JSON creado al objeto.
          chartDataPendientesDeFirma.push(objchartDataPendientesDeFirma);
          chartDataFirmados.push(objchartDataFirmados);
          chartDataTotal.push(objchartDataTotal);

          // Limpiar objetos.
          objchartDataPendientesDeFirma = null;
          objchartDataFirmados = null;
          objchartDataTotal = null;
        } else {
          // JSON - ESTATAL.
          totalEstatalPendientesDeFirma = value.PENDIENTESDEFIRMA;
          totalEstatalFirmados = value.FIRMADOS;
          totalRegistradoresEstatalTotal = value.TOTAL;
          chartDataEstatalRegistradores.push({name: 'Pendientes de firma', value: value.PENDIENTESDEFIRMA});
          chartDataEstatalRegistradores.push({name: 'Firmados', value: value.FIRMADOS});
        }
      });

      // Crear la data para la gráficas.
      this.chartDataPendientesDeFirma = {
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
          data: chartDataPendientesDeFirma.name,
        },
        series: [
          {
            name: 'Access Sources',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: chartDataPendientesDeFirma,
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
                shadowColor: 'rgba(0, 0, 0, 1)',
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
                shadowColor: 'rgba(0, 0, 0, 1)',
              },
            },
          },
        ],
      };
      this.chartDataEstatalRegistradores = {
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
          data: chartDataEstatalRegistradores.name,
        },
        series: [
          {
            name: 'Access Sources',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: chartDataEstatalRegistradores,
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

      chartDataPendientesDeFirma = null;
      chartDataFirmados = null;
      chartDataTotal = null;
      chartDataEstatalRegistradores = null;

      this.spinnerLoadingRegistradores = false;
    }, error => {
      // Desactivar la animación.
      this.spinnerLoadingRegistradores = false;

      // Mostrar ventana.
      this.alerta.show('Error al consultar el servidor', 'Carga de registradores' , { limit: 2, position: NbGlobalLogicalPosition.TOP_END,
        status: 'danger', preventDuplicates: false, icon: {icon: 'exclamation-triangle', pack: 'font-awesome'}});
    });
  }

  obtenerDatosTiempoReal(isChecked) {
    if (isChecked) {
      this.tiempoDeEspera = setInterval(() => {
        this.obtenerDatos();
      }, 5 * 1000);
    } else {
      clearInterval(this.tiempoDeEspera);
    }
  }

  setFechaDiario() {
    // Armar fecha de inicio.
    this.FechaActual = new Date();
    this.FechaInicio = new Date(this.FechaActual.setDate(this.FechaActual.getDate() - 1));
    this.obtenerDatos();
  }

  setFecha1Semana() {
    // Armar fecha de inicio.
    this.FechaActual = new Date();
    this.FechaInicio = new Date(this.FechaActual.setDate(this.FechaActual.getDate() - 6));
    this.obtenerDatos();
  }

  setFecha15Dias() {
    // Armar fecha de inicio.
    this.FechaActual = new Date();
    this.FechaInicio = new Date(this.FechaActual.setDate(this.FechaActual.getDate() - 14));
    this.obtenerDatos();
  }

  setFecha1Mes() {
    // Armar fecha de inicio.
    this.FechaActual = new Date();
    this.FechaInicio = new Date(this.FechaActual.setDate(this.FechaActual.getDate() - 29));
    this.obtenerDatos();
  }

  setFechaTrimestral() {
    // Armar fecha de inicio.
    this.FechaActual = new Date();
    this.FechaInicio = new Date(this.FechaActual.setDate(this.FechaActual.getDate() - 89));
    this.obtenerDatos();
  }

  setFechaSemestral() {
    // Armar fecha de inicio.
    this.FechaActual = new Date();
    this.FechaInicio = new Date(this.FechaActual.setDate(this.FechaActual.getDate() - 179));
    this.obtenerDatos();
  }

  setFechaAnual() {
    // Armar fecha de inicio.
    this.FechaActual = new Date();
    this.FechaInicio = new Date(this.FechaActual.setDate(this.FechaActual.getDate() - 364));
    this.obtenerDatos();
  }

  exportToPDF() {
    // Carga de analistas.
    const chartCAAsignadoParaAnalisis = document.getElementById('caAsignadoParaAnalisis');
    const chartCAEnAnalisis = document.getElementById('caEnAnalisis');
    const chartCAAnalizados = document.getElementById('caAnalizados');
    const chartCAEstatal = document.getElementById('caEstatal');

    // Carga de registradores.
    const chartCRPendientesDeFirma = document.getElementById('crPendientesDeFirma');
    const chartCRFirmados = document.getElementById('crFirmados');
    const chartCRTotal = document.getElementById('crTotal');
    const chartCREstatal = document.getElementById('crEstatal');

    // Definición del documento.
    const docDefinition = {
      content: [],
      styles: {
        tableHeader: {
          bold: true,
          fontSize: 13,
          color: 'black',
        },
        subheader: {
          fontSize: 16,
          bold: true,
          margin: [0, 10, 0, 5],
          alignment: 'center',
        },
        subsubheader: {
          fontSize: 12,
          italics: true,
          margin: [0, 10, 0, 25],
          alignment: 'center',
        },
        table: {
          margin: [0, 5, 0, 15],
        },
      },
      defaultStyle: {
        // alignment: 'center',
      },
      pageOrientation: 'landscape',
    };

    // CARGA DE ANALISTAS.
    // Crear canvas para copiar al PDF.
    html2canvas(chartCAAsignadoParaAnalisis, {
      height: 650,
      width: 1000,
      scale: 3,
      backgroundColor: null,
      logging: false,
    }).then(canvas => {
      // Get chart data so we can append to the pdf
      const dataAsignadoParaAnalisis = canvas.toDataURL();

      // Add some content to the pdf
      const title = {
        text: 'Carga de analistas.',
        style: 'subheader',
      };
      const description = { text: 'Periodo consultado: ' + this.FechaInicio.toLocaleDateString()
          + ' - ' + this.FechaFin.toLocaleDateString(),
        style: 'subsubheader' };
      docDefinition.content.push(title);
      docDefinition.content.push(description);
      docDefinition.content.push({ image: dataAsignadoParaAnalisis, width: 650 }); // imágen de la gráfica.
      this.FilePDF = docDefinition;
      // pdfMake.createPdf(docDefinition).download('chartToPdf' + '.pdf');
    });

    // Crear canvas para copiar al PDF.
    html2canvas(chartCAEnAnalisis, {
      height: 650,
      width: 1000,
      scale: 3,
      backgroundColor: null,
    }).then(canvas => {
      // Get chart data so we can append to the pdf
      const dataEnAnalisis = canvas.toDataURL();

      // Add some content to the pdf
      const title = {
        text: 'Carga de analistas.',
        style: 'subheader',
      };
      const description = { text: 'Periodo consultado: ' + this.FechaInicio.toLocaleDateString()
          + ' - ' + this.FechaFin.toLocaleDateString(),
        style: 'subsubheader' };
      docDefinition.content.push(title);
      docDefinition.content.push(description);
      // Push image of the chart
      docDefinition.content.push({ image: dataEnAnalisis, width: 650});
      this.FilePDF = docDefinition;
      // pdfMake.createPdf(docDefinition).download('chartToPdf' + '.pdf');
    });

    // Crear canvas para copiar al PDF.
    html2canvas(chartCAAnalizados, {
      height: 650,
      width: 1000,
      scale: 3,
      backgroundColor: null,
    }).then(canvas => {
      // Get chart data so we can append to the pdf
      const dataAnalizados = canvas.toDataURL();

      // Add some content to the pdf
      const title = {
        text: 'Carga de analistas.',
        style: 'subheader',
      };
      const description = { text: 'Periodo consultado: ' + this.FechaInicio.toLocaleDateString()
          + ' - ' + this.FechaFin.toLocaleDateString(),
        style: 'subsubheader' };
      docDefinition.content.push(title);
      docDefinition.content.push(description);
      // Push image of the chart
      docDefinition.content.push({ image: dataAnalizados, width: 650});
      this.FilePDF = docDefinition;
      // pdfMake.createPdf(docDefinition).download('chartToPdf' + '.pdf');
    });

    // Crear canvas para copiar al PDF.
    html2canvas(chartCAEstatal, {
      height: 650,
      width: 1000,
      scale: 3,
      backgroundColor: null,
    }).then(canvas => {
      // Get chart data so we can append to the pdf
      const dataEstatal = canvas.toDataURL();

      // Add some content to the pdf
      const title = {
        text: 'Carga de analistas.',
        style: 'subheader',
      };
      const description = { text: 'Periodo consultado: ' + this.FechaInicio.toLocaleDateString()
          + ' - ' + this.FechaFin.toLocaleDateString(),
        style: 'subsubheader' };
      docDefinition.content.push(title);
      docDefinition.content.push(description);
      // Push image of the chart
      docDefinition.content.push({ image: dataEstatal, width: 680 });
      this.FilePDF = docDefinition;
      // pdfMake.createPdf(docDefinition).download('chartToPdf' + '.pdf');
    });

    // CARGA DE REGISTRADORES.
    // Crear canvas para copiar al PDF.
    html2canvas(chartCRPendientesDeFirma, {
      height: 650,
      width: 1000,
      scale: 3,
      backgroundColor: null,
      logging: false,
    }).then(canvas => {
      // Get chart data so we can append to the pdf
      const dataPendientesDeFirma = canvas.toDataURL();

      // Add some content to the pdf
      const title = {
        text: 'Carga de registradores.',
        style: 'subheader',
      };
      const description = { text: 'Periodo consultado: ' + this.FechaInicio.toLocaleDateString()
          + ' - ' + this.FechaFin.toLocaleDateString(),
        style: 'subsubheader' };
      docDefinition.content.push(title);
      docDefinition.content.push(description);
      docDefinition.content.push({ image: dataPendientesDeFirma, width: 650 }); // imágen de la gráfica.
      this.FilePDF = docDefinition;
      // pdfMake.createPdf(docDefinition).download('chartToPdf' + '.pdf');
    });

    // Crear canvas para copiar al PDF.
    html2canvas(chartCRFirmados, {
      height: 650,
      width: 1000,
      scale: 3,
      backgroundColor: null,
    }).then(canvas => {
      // Get chart data so we can append to the pdf
      const dataFirmados = canvas.toDataURL();

      // Add some content to the pdf
      const title = {
        text: 'Carga de registradores.',
        style: 'subheader',
      };
      const description = { text: 'Periodo consultado: ' + this.FechaInicio.toLocaleDateString()
          + ' - ' + this.FechaFin.toLocaleDateString(),
        style: 'subsubheader' };
      docDefinition.content.push(title);
      docDefinition.content.push(description);
      // Push image of the chart
      docDefinition.content.push({ image: dataFirmados, width: 650});
      this.FilePDF = docDefinition;
      // pdfMake.createPdf(docDefinition).download('chartToPdf' + '.pdf');
    });

    // Crear canvas para copiar al PDF.
    html2canvas(chartCRTotal, {
      height: 650,
      width: 1000,
      scale: 3,
      backgroundColor: null,
    }).then(canvas => {
      // Get chart data so we can append to the pdf
      const dataTotal = canvas.toDataURL();

      // Add some content to the pdf
      const title = {
        text: 'Carga de registradores.',
        style: 'subheader',
      };
      const description = { text: 'Periodo consultado: ' + this.FechaInicio.toLocaleDateString()
          + ' - ' + this.FechaFin.toLocaleDateString(),
        style: 'subsubheader' };
      docDefinition.content.push(title);
      docDefinition.content.push(description);
      // Push image of the chart
      docDefinition.content.push({ image: dataTotal, width: 650});
      this.FilePDF = docDefinition;
      // pdfMake.createPdf(docDefinition).download('chartToPdf' + '.pdf');
    });

    // Crear canvas para copiar al PDF.
    html2canvas(chartCREstatal, {
      height: 650,
      width: 1000,
      scale: 3,
      backgroundColor: null,
    }).then(canvas => {
      // Get chart data so we can append to the pdf
      const dataEstatal = canvas.toDataURL();

      // Add some content to the pdf
      const title = {
        text: 'Carga de registradores.',
        style: 'subheader',
      };
      const description = { text: 'Periodo consultado: ' + this.FechaInicio.toLocaleDateString()
          + ' - ' + this.FechaFin.toLocaleDateString(),
        style: 'subsubheader' };
      docDefinition.content.push(title);
      docDefinition.content.push(description);
      // Push image of the chart
      docDefinition.content.push({ image: dataEstatal, width: 680 });
      this.FilePDF = docDefinition;
      // pdfMake.createPdf(docDefinition).download('chartToPdf' + '.pdf');
    });

    // Download PDF
    if (this.FilePDF) {
      pdfmake.createPdf(this.FilePDF).download('chartToPdf' + '.pdf');
    } else {
      // console.log('Chart is not yet rendered!');
    }
  }
}
