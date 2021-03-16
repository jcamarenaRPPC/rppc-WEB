import {Component, OnInit} from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {NbToastrService, NbWindowService} from '@nebular/theme';
import {APIService} from '../../../../service/apiservice.service';
import {first} from 'rxjs/operators';

@Component({
  selector: 'ngx-reporte2',
  templateUrl: './crPorMunicipio.component.html',
  styleUrls: ['./crPorMunicipio.component.scss'],
})
export class CrPorMunicipioComponent implements OnInit {
  // Declarar variables [ngmodel]
  Fecha1 = new Date();
  Fecha2 = new Date();

  // Declarar objetos.
  mensajeLoading: string;
  tblDatosMexicali = [];
  tblDatosTijuana = [];
  tblDatosEnsenada = [];
  tblDatosTecate = [];
  tblDatosRosarito = [];
  tblConcentrado1MXL = [];
  tblConcentrado2MXL = [];
  tblDetalladoMXL = [];
  tblConcentrado1TIJ = [];
  tblConcentrado2TIJ = [];
  tblDetalladoTIJ = [];
  tblConcentrado1ENS = [];
  tblConcentrado2ENS = [];
  tblDetalladoENS = [];
  tblConcentrado1TEC = [];
  tblConcentrado2TEC = [];
  tblDetalladoTEC = [];
  tblConcentrado1ROS = [];
  tblConcentrado2ROS = [];
  tblDetalladoROS = [];

  // Declarar spinnners.
  spinnerLoadingMexicali: any;
  spinnerLoadingTijuana: any;
  spinnerLoadingEnsenada: any;
  spinnerLoadingTecate: any;
  spinnerLoadingRosarito: any;

  tableSourceMexicali: LocalDataSource;
  tableSourceTijuana: LocalDataSource;
  tableSourceEnsenada: LocalDataSource;
  tableSourceTecate: LocalDataSource;
  tableSourceRosarito: LocalDataSource;

  // Crear la configuración para la tabla de datos.
  tableConfigMexicali = {
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
      REGISTRADOR: {
        title: 'Registrador',
      },
      PENDIENTESDEFIRMA: {
        title: 'Municipios de firma',
      },
      FIRMADOS: {
        title: 'Firmados',
      },
      TOTAL: {
        title: 'Total',
      },
    },
  };
  tableConfigTijuana = {
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
      REGISTRADOR: {
        title: 'Registrador',
      },
      PENDIENTESDEFIRMA: {
        title: 'Municipios de firma',
      },
      FIRMADOS: {
        title: 'Firmados',
      },
      TOTAL: {
        title: 'Total',
      },
    },
  };
  tableConfigEnsenada = {
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
      REGISTRADOR: {
        title: 'Registrador',
      },
      PENDIENTESDEFIRMA: {
        title: 'Municipios de firma',
      },
      FIRMADOS: {
        title: 'Firmados',
      },
      TOTAL: {
        title: 'Total',
      },
    },
  };
  tableConfigTecate = {
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
      REGISTRADOR: {
        title: 'Registrador',
      },
      PENDIENTESDEFIRMA: {
        title: 'Municipios de firma',
      },
      FIRMADOS: {
        title: 'Firmados',
      },
      TOTAL: {
        title: 'Total',
      },
    },
  };
  tableConfigRosarito = {
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
      REGISTRADOR: {
        title: 'Registrador',
      },
      PENDIENTESDEFIRMA: {
        title: 'Municipios de firma',
      },
      FIRMADOS: {
        title: 'Firmados',
      },
      TOTAL: {
        title: 'Total',
      },
    },
  };

  constructor(private alerta: NbToastrService, private objServicio: APIService, private windowService: NbWindowService) {
    // Inicializar objetos.
    this.tableSourceMexicali = new LocalDataSource(this.tblDatosMexicali);
    this.tableSourceTijuana = new LocalDataSource(this.tblDatosTijuana);
    this.tableSourceEnsenada = new LocalDataSource(this.tblDatosEnsenada);
    this.tableSourceTecate = new LocalDataSource(this.tblDatosTecate);
    this.tableSourceRosarito = new LocalDataSource(this.tblDatosRosarito);
  }

  ngOnInit(): void {
  }

  obtenerDatosMexicali() {
    // Crear objeto de datos.
    const parametros = {
      'OFICINAID': '1', 'Fecha1': this.Fecha1.toLocaleDateString(), 'Fecha2': this.Fecha2.toLocaleDateString(),
    };

    // Activar animación loading.
    this.spinnerLoadingMexicali = true;

    // Llamar al controlador y ejecutar la peticion httpRequest.
    this.objServicio.objCargaRegistradoresController.consultarPorMunicipio(parametros).pipe(first()).subscribe((respuestaServer: any) => {
      // Convertir la respuesta a un objeto JSON.
      this.tblDatosMexicali = JSON.parse(respuestaServer);

      // Asignar lista de datos y refrescar pantalla.
      this.tableSourceMexicali.load(this.tblDatosMexicali);
      this.tableSourceMexicali.refresh();
      this.spinnerLoadingMexicali = false;
    }, error => {
      // Desactivar la animación.
      this.spinnerLoadingMexicali = false;

      // Mostrar ventana.
      this.alerta.danger(error, 'Alerta');
    });
  }

  obtenerDatosTijuana() {
    // Crear objeto de datos.
    const parametros = {
      'OFICINAID': '2', 'Fecha1': this.Fecha1.toLocaleDateString(), 'Fecha2': this.Fecha2.toLocaleDateString(),
    };

    // Activar animación loading.
    this.spinnerLoadingTijuana = true;

    // Llamar al controlador y ejecutar la peticion httpRequest.
    this.objServicio.objCargaRegistradoresController.consultarPorMunicipio(parametros).pipe(first()).subscribe((respuestaServer: any) => {
      // Convertir la respuesta a un objeto JSON.
      this.tblDatosTijuana = JSON.parse(respuestaServer);

      // Asignar lista de datos y refrescar pantalla.
      this.tableSourceTijuana.load(this.tblDatosTijuana);
      this.tableSourceTijuana.refresh();
      this.spinnerLoadingTijuana = false;
    }, error => {
      // Desactivar la animación.
      this.spinnerLoadingTijuana = false;

      // Mostrar ventana.
      this.alerta.danger(error, 'Alerta');
    });
  }

  obtenerDatosEnsenada() {
    // Crear objeto de datos.
    const parametros = {
      'OFICINAID': '3', 'Fecha1': this.Fecha1.toLocaleDateString(), 'Fecha2': this.Fecha2.toLocaleDateString(),
    };

    // Activar animación loading.
    this.spinnerLoadingEnsenada = true;

    // Llamar al controlador y ejecutar la peticion httpRequest.
    this.objServicio.objCargaRegistradoresController.consultarPorMunicipio(parametros).pipe(first()).subscribe((respuestaServer: any) => {
      // Convertir la respuesta a un objeto JSON.
      this.tblDatosEnsenada = JSON.parse(respuestaServer);

      // Asignar lista de datos y refrescar pantalla.
      this.tableSourceEnsenada.load(this.tblDatosEnsenada);
      this.tableSourceEnsenada.refresh();
      this.spinnerLoadingEnsenada = false;
    }, error => {
      // Desactivar la animación.
      this.spinnerLoadingEnsenada = false;

      // Mostrar ventana.
      this.alerta.danger(error, 'Alerta');
    });
  }

  obtenerDatosTecate() {
    // Crear objeto de datos.
    const parametros = {
      'OFICINAID': '4', 'Fecha1': this.Fecha1.toLocaleDateString(), 'Fecha2': this.Fecha2.toLocaleDateString(),
    };

    // Activar animación loading.
    this.spinnerLoadingTecate = true;

    // Llamar al controlador y ejecutar la peticion httpRequest.
    this.objServicio.objCargaRegistradoresController.consultarPorMunicipio(parametros).pipe(first()).subscribe((respuestaServer: any) => {
      // Convertir la respuesta a un objeto JSON.
      this.tblDatosTecate = JSON.parse(respuestaServer);

      // Asignar lista de datos y refrescar pantalla.
      this.tableSourceTecate.load(this.tblDatosTecate);
      this.tableSourceTecate.refresh();
      this.spinnerLoadingTecate = false;
    }, error => {
      // Desactivar la animación.
      this.spinnerLoadingTecate = false;

      // Mostrar ventana.
      this.alerta.danger(error, 'Alerta');
    });
  }

  obtenerDatosRosarito() {
    // Crear objeto de datos.
    const parametros = {
      'OFICINAID': '5', 'Fecha1': this.Fecha1.toLocaleDateString(), 'Fecha2': this.Fecha2.toLocaleDateString(),
    };

    // Activar animación loading.
    this.spinnerLoadingRosarito = true;

    // Llamar al controlador y ejecutar la peticion httpRequest.
    this.objServicio.objCargaRegistradoresController.consultarPorMunicipio(parametros).pipe(first()).subscribe((respuestaServer: any) => {
      // Convertir la respuesta a un objeto JSON.
      this.tblDatosRosarito = JSON.parse(respuestaServer);

      // Asignar lista de datos y refrescar pantalla.
      this.tableSourceRosarito.load(this.tblDatosRosarito);
      this.tableSourceRosarito.refresh();
      this.spinnerLoadingRosarito = false;
    }, error => {
      // Desactivar la animación.
      this.spinnerLoadingRosarito = false;

      // Mostrar ventana.
      this.alerta.danger(error, 'Alerta');
    });
  }

  abrirModal() {
    // Abrir ventana secundaria.
    this.windowService.open(CrPorMunicipioComponent, {title: 'Nueva ventana'});
  }
}
