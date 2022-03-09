import { Component, OnInit } from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {NbGlobalLogicalPosition, NbToastrService} from '@nebular/theme';
import {APIService} from '../../../service/apiservice.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {first} from 'rxjs/operators';
@Component({
  selector: 'ngx-captura-indicadores',
  templateUrl: './captura-indicadores.component.html',
  styleUrls: ['./captura-indicadores.component.scss'],
})
export class CapturaIndicadoresComponent implements OnInit {

  // Declarar variables [ngmodel]
  anio: string;
  // Declarar animaciones.
  animacionAnio: boolean = false;

  // Declarar objetos.
  mensajeLoading: string;
  tblDatos = [];
  camposVacios: boolean = false;
  noEsNumero: boolean = false;
  esAdmin: boolean = false;
  ocultarCamposModal: boolean = false;

  // Declarar spinnners.
  spinnerLoading: any;
  tableSource: LocalDataSource;

  // Declaracion de opcion seleccionada[ngmodel] y elementos de selects
  indicadorSelected: number = 0; oficinaSelected: number = 0;
  items: any[] = [
    { id: 0, name: 'Información Registral Via Oficios' },
    { id: 1, name: 'Capacitación' },
    { id: 2, name: 'Indice de Satisfacción al Usuario' },
    { id: 3, name: 'Actas Constitutivas Civiles' },
    { id: 4, name: 'Porcentaje de Certificados Entregados con Error' },
    { id: 5, name: 'Porcentaje de Inscripciones Entregados con Error' },
    { id: 6, name: 'Certificado de No Propiedad' },
    { id: 7, name: 'Segundos Análisis en Inscripciones' },
    { id: 8, name: 'Segundos Análisis en Certificaciones' },
  ];
  meses: any[] = [{ value: '1', title: 'Enero' }, { value: '2', title: 'Febrero' },
    { value: '3', title: 'Marzo' }, { value: '4', title: 'Abril' },
    { value: '5', title: 'Mayo' }, { value: '6', title: 'Junio' },
    { value: '7', title: 'Julio' }, { value: '8', title: 'Agosto' },
    { value: '9', title: 'Septiembre' }, { value: '10', title: 'Octubre' },
    { value: '11', title: 'Noviembre' }, { value: '12', title: 'Diciembre' },
  ];
  // Y declaracion del texto de campos 1 y 2
  txtCampo1: string  = 'Total de trámites';
  txtCampo2: string  = 'Total de dias';
  // Declaracion de variables [ngModel] para los campos del modal 1
  anioInput: string = '';
  anioStatus: string = 'basic';
  mesInput: string = '1';
  total1Input: string = ''; total1Status: string = 'basic';
  total2Input: string = ''; total2Status: string = 'basic';
  // Crear la configuración para la tabla de datos.
  tablaPruebaConfig = {
    selectMode: 'multiple',
    noDataMessage: 'No hay datos consultados.',
    mode: 'inline' , // o 'external'
    pager: {
      display: true,
      perPage: 15,
    },
    actions: {
      columnTitle: 'Acciones',
      add: true,
      edit: true,
      delete: true,
      position: 'right',
    },
    add: {
      addButtonContent: '<i class="material-icons">add_circle</i>',
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
      ANIO: {
        title: 'Año',
        hide: false,
      },
      MES: {
        title: 'Mes',
        hide: false,
        valuePrepareFunction: (value) => {
          if (!value) return '';
          return this.meses[value - 1].title;
        },
        filterFunction( cell: any, search: string): boolean {
          search = search.toLowerCase();
          const meses: string[] = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
            'julio', 'agosto', 'septiembre', 'octubre' , 'noviembre' , 'diciembre'];
          // Se obtiene el mes con el valor de la celda, ej. 9 (agosto), 1 (enero)
          const mes = meses[cell - 1];
          // Do filter stuff here and return true (to keep row) or false (to remove row)
          if (mes.includes(search) || search === '') {
            return true;
          } else  {
            return false;
          }
        },
        editor: {
          type: 'list',
          config: {
            list: [],
          },
        },
      },
      TOTAL1: {
        title: 'Total de trámites',
      },
      TOTAL2: {
        title: 'Total de dias',
      },
    },
  };
  // indicadorSelectedRows: Emp[] = [];
  closeResult = '';
  // Metodo que se ejecuta al seleccionar un renglon de la tabla
  // para mostrar modal
  /*onUserRowSelect(event, modal) {
    this.indicadorSelectedRows = event.indicadorSelected;
    this.modalService.open(modal, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }*/

  // Metodo que se ejecuta al presionar 'x' o boton Cancelar
  // del modal
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  constructor(private alerta: NbToastrService, private objServicio: APIService, private modalService: NgbModal) {
    // Inicializar objetos.
    this.tableSource = new LocalDataSource(this.tblDatos);
  }

  ngOnInit(): void {
    this.anio = new Date().getFullYear().toString();
    // Se inicializa la bandera de si el usuario es admin
    if (localStorage.getItem('TipoUsuario') === 'ADMINISTRADOR') {
      this.esAdmin = true;
    }
    // Se inicializa el editor de la columna MES con la lista de meses
    // de la tabla de indicadores
    this.tablaPruebaConfig.columns.MES.editor.config.list = this.meses;
    // Se inicializa los datos de la tabla obteniendo los datos del indicador
    // y agregandolos en este metodo
    this.obtenerDatosIndicador();
  }

  agregarRow(event) {
    // Se copia los datos del row
    const datosRow = event.newData;
    // Se validan los campos de la tabla.
    // Si el indicador seleccionado es menor a 3, se valida el campo anio y mes
    // debido a que solo los indicadores menor a 3 contiene esos campos
    // if (this.indicadorSelected <= 3) {
    //   if (!datosRow['ANIO'] || !datosRow['MES']) {
    //     this.camposVacios = true;
    //   } else {
    //     this.camposVacios = false;
    //   }
    // }
    if (!datosRow['ANIO'] || !datosRow['MES'] || !datosRow['TOTAL1'] || !datosRow['TOTAL2']) {
      this.camposVacios = true;
    } else {
      this.camposVacios = false;
    }

    // Se validan si capturo numeros en los campos de anio y totales
    // if (this.indicadorSelected <= 3) {
    //   if (Number.isInteger(Number(datosRow['ANIO'])) === false ) {
    //     this.noEsNumero = true;
    //   } else {
    //     this.noEsNumero = false;
    //   }
    // }
    if (Number.isInteger(Number(datosRow['ANIO'])) === false || Number.isInteger(Number(datosRow['TOTAL1'])) === false
      || Number.isInteger(Number(datosRow['TOTAL2'])) === false ) {
      this.noEsNumero = true;
    } else {
      this.noEsNumero = false;
    }

    // Si hay campos vacios
    if (this.camposVacios) {
      // Mostrar ventana.
      this.alerta.show('', 'Capturar campos vacios', { limit: 1, position: NbGlobalLogicalPosition.TOP_END,
        status: 'danger', preventDuplicates: true, icon: {icon: 'exclamation-triangle', pack: 'font-awesome'}});
      // Y se pone en false camposVacios
      this.camposVacios = false;
      // Si hay campos que no es numero
    } else if (this.noEsNumero) {
      // Mostrar ventana.
      this.alerta.show('', 'Debe ingresar solo números', { limit: 1, position: NbGlobalLogicalPosition.TOP_END,
        status: 'danger', preventDuplicates: true, icon: {icon: 'exclamation-triangle', pack: 'font-awesome'}});
    } else {
      if (window.confirm('¿Está seguro que deseas agregarlo?')) {
        // Se agrega el key INDICADOR con el indicador seleccionado
        datosRow['INDICADOR'] = this.indicadorSelected.toString();
        if (this.esAdmin) {
          // Y el key MUNICIPIO con el id de oficina
          datosRow['MUNICIPIO'] = (this.oficinaSelected + 1).toString();
        } else {
          // se inicializa la oficina con la id de oficina del usuario
          datosRow['MUNICIPIO'] = localStorage.getItem('OficinaID');
        }

        // Y se envia la peticion para agregar el registro en el servidor
        this.objServicio.objIndicadoresController.agregarIndicador(datosRow).pipe(first()).subscribe((respuestaServer: any) => {
          // Y se confirma el evento para agregar un row con los datos ingresados
          event.confirm.resolve(event.newData);

          // Mostrar ventana.
          this.alerta.show('', 'Registro agregado existosamente',
            { limit: 1, position: NbGlobalLogicalPosition.TOP_END,
              status: 'success', preventDuplicates: true, icon: {icon: 'check', pack: 'font-awesome'}});
        }, error => {
          // Desactivar la animación.
          this.spinnerLoading = false;

          // Mostrar ventana.
          this.alerta.show('', error, { limit: 1, position: NbGlobalLogicalPosition.TOP_END,
            status: 'danger', preventDuplicates: true, icon: {icon: 'exclamation-triangle', pack: 'font-awesome'}});
        });
      } else {
        event.confirm.reject();
      }
    }
  }
  borrarRow(event) {
    // Se copia los datos del row
    const datosRow = event.data;
    if (window.confirm('¿Está seguro que deseas eliminar el registro?')) {
      // Y se envia la peticion para agregar el registro en el servidor
      this.objServicio.objIndicadoresController.borrarIndicador(datosRow).pipe(first()).subscribe((respuestaServer: any) => {
        // Y se confirma el evento para eliminar el registro del indicador
        event.confirm.resolve();
        // Mostrar ventana.
        this.alerta.show('', 'Registro eliminado', { limit: 1, position: NbGlobalLogicalPosition.TOP_END,
          status: 'danger', preventDuplicates: true, icon: {icon: 'trash', pack: 'font-awesome'}});
      }, error => {
        // Desactivar la animación.
        this.spinnerLoading = false;

        // Mostrar ventana.
        this.alerta.show('', error, { limit: 1, position: NbGlobalLogicalPosition.TOP_END,
          status: 'danger', preventDuplicates: true, icon: {icon: 'exclamation-triangle', pack: 'font-awesome'}});
      });
    } else {
      event.confirm.reject();
    }
  }
  editarRow(event) {
    // Se copia los datos del row
    const datosRow = event.newData;
    // Se validan los campos de la tabla.
    // Si el indicador seleccionado es menor a 3, se valida el campo anio y mes
    // debido a que solo los indicadores menor a 3 contiene esos campos
    // if (this.indicadorSelected <= 3) {
    //   if (!datosRow['ANIO'] || !datosRow['MES']) {
    //     this.camposVacios = true;
    //   } else {
    //     this.camposVacios = false;
    //   }
    // }
    if (!datosRow['ANIO'] || !datosRow['MES'] || !datosRow['TOTAL1'] || !datosRow['TOTAL2']) {
      this.camposVacios = true;
    } else {
      this.camposVacios = false;
    }

    // Se validan si capturo numeros en los campos de anio y totales
    // if (this.indicadorSelected <= 3) {
    //   if (Number.isInteger(Number(datosRow['ANIO'])) === false ) {
    //     this.noEsNumero = true;
    //   } else {
    //     this.noEsNumero = false;
    //   }
    // }
    if (Number.isInteger(Number(datosRow['ANIO'])) === false || Number.isInteger(Number(datosRow['TOTAL1'])) === false
      || Number.isInteger(Number(datosRow['TOTAL2'])) === false ) {
      this.noEsNumero = true;
    } else {
      this.noEsNumero = false;
    }

    // Si hay campos vacios
    if (this.camposVacios) {
      // Mostrar ventana.
      this.alerta.show('', 'Capturar campos vacios', { limit: 1, position: NbGlobalLogicalPosition.TOP_END,
        status: 'danger', preventDuplicates: true, icon: {icon: 'exclamation-triangle', pack: 'font-awesome'}});
      // Y se pone en false camposVacios
      this.camposVacios = false;
      // Si hay campos que no es numero
    } else if (this.noEsNumero) {
      // Mostrar ventana.
      this.alerta.show('', 'Debe ingresar solo números', { limit: 1, position: NbGlobalLogicalPosition.TOP_END,
        status: 'danger', preventDuplicates: true, icon: {icon: 'exclamation-triangle', pack: 'font-awesome'}});
    } else {
      if (window.confirm('¿Está seguro que deseas actualizar el registro?')) {
        // Y se envia la peticion para agregar el registro en el servidor
        this.objServicio.objIndicadoresController.editarIndicador(datosRow).pipe(first()).subscribe((respuestaServer: any) => {
          // Y se confirma el evento para agregar un row con los datos ingresados
          event.confirm.resolve(event.newData);

          // Mostrar ventana.
          this.alerta.show('', 'Registro actualizado', { limit: 1, position: NbGlobalLogicalPosition.TOP_END,
            status: 'info', preventDuplicates: true, icon: {icon: 'check', pack: 'font-awesome'}});
        }, error => {
          // Desactivar la animación.
          this.spinnerLoading = false;

          // Mostrar ventana.
          this.alerta.show('', error, { limit: 1, position: NbGlobalLogicalPosition.TOP_END,
            status: 'danger', preventDuplicates: true, icon: {icon: 'exclamation-triangle', pack: 'font-awesome'}});
        });
      } else {
        event.confirm.reject();
      }
    }
  }
  // Metodo para crear row a la tabla (desde el modal)
  crearRow() {
    // Se validan los inputs del modal.
    // Si el indicador seleccionado es menor a 3, se valida el campo anio
    // debido a que solo los indicadores menor a 3 contiene el campo anio
    if (this.indicadorSelected <= 3) {
      if (!this.anioInput) {
        this.anioStatus = 'danger';
        this.camposVacios = true;
      }
    }
    if (!this.total1Input) {
      this.total1Status = 'danger';
      this.camposVacios = true;
    }

    if (!this.total2Input) {
      this.total2Status = 'danger';
      this.camposVacios = true;
    }

    // Validar que no esten vacios los campos.
    if (this.camposVacios) {
      this.animacionAnio = true;
      setTimeout((arg) => { this.animacionAnio = false; },
        300);
    }

    if (!this.camposVacios) {
      const datos = { INDICADOR : this.indicadorSelected.toString(), ANIO : this.anioInput,
        MES : this.mesInput, TOTAL1 : this.total1Input, TOTAL2 : this.total2Input,
      };
      if (window.confirm('¿Está seguro que deseas agregarlo?')) {
        if (this.esAdmin) {
          // se agrega key MUNICIPIO con el id de oficina seleccionada
          datos['MUNICIPIO'] = (this.oficinaSelected + 1).toString();
        } else {
          // se inicializa la oficina con la id de oficina del usuario
          datos['MUNICIPIO'] = localStorage.getItem('OficinaID');
        }

        this.objServicio.objIndicadoresController.agregarIndicador(datos).pipe(first()).subscribe((respuestaServer: any) => {
          const datosRow = { ANIO : this.anioInput, MES : this.mesInput, TOTAL1 : this.total1Input,
            TOTAL2 : this.total2Input,
          };
          // Se agrega un row a la tabla con los datos ingresados
          this.tableSource.add(datosRow).then(r => this.tableSource.refresh());
          this.modalService.dismissAll();

          // Y se limpia las variables del form del modal
          this.limpiarModal();

          // Mostrar ventana
          this.alerta.show('', 'Registro agregado existosamente',
            { limit: 1, position: NbGlobalLogicalPosition.TOP_END,
              status: 'success', preventDuplicates: true, icon: {icon: 'check', pack: 'font-awesome'}});
        }, error => {
          // Desactivar la animación.
          this.spinnerLoading = false;

          // Mostrar ventana.
          this.alerta.show('', error, { limit: 1, position: NbGlobalLogicalPosition.TOP_END,
            status: 'danger', preventDuplicates: true, icon: {icon: 'exclamation-triangle', pack: 'font-awesome'}});
        });
      }
    }
  }
  showModal(modal) {
    // Si la posicion del indicador seleeccionado es mayor a 3, solo se van a mostrar 2 campos en el modal
    // debido a que los indicadores despues del 3 no requieren anio y mes
    if (this.indicadorSelected > 3) {
      this.ocultarCamposModal = true;
    } else {
      this.ocultarCamposModal = false;
    }
    // Do something with `this.indicadorSelectedRows`
    this.modalService.open(modal, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      // Y se limpia las variables del form del modal
      this.limpiarModal();
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      // Y se limpia las variables del form del modal
      this.limpiarModal();
    });
  }
  // Metodo para limpiar variables del modal
  limpiarModal() {
    this.anioInput = ''; this.mesInput = '1';
    this.total1Input = ''; this.total2Input = '';
    this.anioStatus = ''; this.total1Status = ''; this.total2Status = '';
    this.camposVacios = false;
  }
  // Metodo que se ejecuta al cambiar de indicador
  obtenerDatosIndicador() {
    // Activar animación loading.
    this.spinnerLoading = true;

    const datos = {
      'INDICADOR' : this.indicadorSelected.toString(),
    };

    if (this.esAdmin) {
      // Y el key MUNICIPIO con el id de oficina
      datos['MUNICIPIO'] = (this.oficinaSelected + 1).toString();
    } else {
      // se inicializa la oficina con la id de oficina del usuario
      datos['MUNICIPIO'] = localStorage.getItem('OficinaID');
    }

    // Llamar al controlador y ejecutar la peticion httpRequest.
    this.objServicio.objIndicadoresController.obtenerDatosIndicado(datos).pipe(first()).subscribe((respuestaServer: any) => {
      // Convertir la respuesta a un objeto JSON.
      this.tblDatos = JSON.parse(respuestaServer);
      // Se cambia los textos de las columnas y campos del indicador
      this.cambioTxtIndicador();
      // Y se carga los datos del indicador en la tabla
      this.tableSource.load(this.tblDatos).then(r => this.tableSource.refresh());
      this.spinnerLoading = false;
    }, error => {
      // Desactivar la animación.
      this.spinnerLoading = false;

      // Mostrar ventana.
      this.alerta.show('', error, { limit: 1, position: NbGlobalLogicalPosition.TOP_END,
        status: 'danger', preventDuplicates: true, icon: {icon: 'exclamation-triangle', pack: 'font-awesome'}});
    });
    // if (this.indicadorSelected <= 3) {
    //   // Llamar al controlador y ejecutar la peticion httpRequest.
    //   this.objServicio.objIndicadoresController.obtenerDatosIndicado(datos).pipe(first()).subscribe((respuestaServer: any) => {
    //     // Convertir la respuesta a un objeto JSON.
    //     this.tblDatos = JSON.parse(respuestaServer);
    //     // Se cambia los textos de las columnas y campos del indicador
    //     this.cambioTxtIndicador();
    //     // Y se carga los datos del indicador en la tabla
    //     this.tableSource.load(this.tblDatos).then(r => this.tableSource.refresh());
    //     this.spinnerLoading = false;
    //   }, error => {
    //     // Desactivar la animación.
    //     this.spinnerLoading = false;
    //
    //     // Mostrar ventana.
    //     this.alerta.show('', error, { limit: 1, position: NbGlobalLogicalPosition.TOP_END,
    //       status: 'danger', preventDuplicates: true, icon: {icon: 'exclamation-triangle', pack: 'font-awesome'}});
    //   });
    // } else {
    //   // Se cambia los textos de las columnas y campos del indicador
    //   this.cambioTxtIndicador();
    //   this.tableSource.refresh();
    //   this.spinnerLoading = false;
    // }
  }
  // Metodo para cambiar texto de columnas y campos de totales del indicador
  cambioTxtIndicador() {
    switch (this.indicadorSelected) {
      case 0: {
        this.txtCampo1 = 'Total de trámites';
        this.txtCampo2 = 'Total de dias';
        const configuracionColumnas = this.tablaPruebaConfig;
        // if (configuracionColumnas.columns.ANIO.hide) {
        //   configuracionColumnas.columns.ANIO.hide = false;
        //   configuracionColumnas.columns.MES.hide = false;
        // }
        // Se cambia el texto de los headers(solo los ultimos dos columnas)
        configuracionColumnas.columns.TOTAL1.title = 'Total de trámites';
        configuracionColumnas.columns.TOTAL2.title = 'Total de dias';
        // Actualizar la configuracion original de la tabla con la configuracion
        // temporal auxiliar.
        this.tablaPruebaConfig = Object.assign({}, configuracionColumnas);
        // En este caso, como no se aplica un retardo al asignar la configuracion
        // se agrega un 'timeout' para simular que retarda la accion por x microsegundos
        // o sino la aplicacion crashea
        /*        setTimeout((arg) => {
                    this.tablaPruebaConfig = Object.assign({}, configuracionColumnas);
                  },
                  300);*/
        break;
      }
      case 1: {
        this.txtCampo1 = 'Total de personal';
        this.txtCampo2 = 'Cursos';
        const configuracionColumnas = this.tablaPruebaConfig;
        // if (configuracionColumnas.columns.ANIO.hide) {
        //   configuracionColumnas.columns.ANIO.hide = false;
        //   configuracionColumnas.columns.MES.hide = false;
        // }
        // Se cambia el texto de los headers(solo los ultimos dos columnas)
        configuracionColumnas.columns.TOTAL1.title = 'Total de personal';
        configuracionColumnas.columns.TOTAL2.title = 'Cursos';
        // Actualizar la configuracion original de la tabla con la configuracion
        // temporal auxiliar.
        this.tablaPruebaConfig = Object.assign({}, configuracionColumnas);
        break;
      }
      case 2: {
        this.txtCampo1 = 'Total de encuestas';
        this.txtCampo2 = 'Total de puntos';
        const configuracionColumnas = this.tablaPruebaConfig;
        // if (configuracionColumnas.columns.ANIO.hide) {
        //   configuracionColumnas.columns.ANIO.hide = false;
        //   configuracionColumnas.columns.MES.hide = false;
        // }
        // Se cambia el texto de los headers(solo los ultimos dos columnas)
        configuracionColumnas.columns.TOTAL1.title = 'Total de encuestas';
        configuracionColumnas.columns.TOTAL2.title = 'Total de puntos';
        // Actualizar la configuracion original de la tabla con la configuracion
        // temporal auxiliar.
        this.tablaPruebaConfig = Object.assign({}, configuracionColumnas);
        break;
      }
      case 3: {
        this.txtCampo1 = 'Total de actas';
        this.txtCampo2 = 'Tiempo total de horas';
        const configuracionColumnas = this.tablaPruebaConfig;
        // if (configuracionColumnas.columns.ANIO.hide) {
        //   configuracionColumnas.columns.ANIO.hide = false;
        //   configuracionColumnas.columns.MES.hide = false;
        // }
        // Se cambia el texto de los headers(solo los ultimos dos columnas)
        configuracionColumnas.columns.TOTAL1.title = 'Total de actas';
        configuracionColumnas.columns.TOTAL2.title = 'Tiempo total de horas';
        // Actualizar la configuracion original de la tabla con la configuracion
        // temporal auxiliar.
        this.tablaPruebaConfig = Object.assign({}, configuracionColumnas);
        break;
      }
      case 4: {
        this.txtCampo1 = 'Total de certificados';
        this.txtCampo2 = 'Total errores';
        const configuracionColumnas = this.tablaPruebaConfig;
        // if (configuracionColumnas.columns.ANIO.hide === false) {
        //   configuracionColumnas.columns.ANIO.hide = true;
        //   configuracionColumnas.columns.MES.hide = true;
        // }

        // Se cambia el texto de los headers(solo los ultimos dos columnas)
        configuracionColumnas.columns.TOTAL1.title = 'Total de certificados';
        configuracionColumnas.columns.TOTAL2.title = 'Total errores';
        // Actualizar la configuracion original de la tabla con la configuracion
        // temporal auxiliar.
        this.tablaPruebaConfig = Object.assign({}, configuracionColumnas);
        break;
      }
      case 5: {
        this.txtCampo1 = 'Total de inscripciones';
        this.txtCampo2 = 'Total errores';
        const configuracionColumnas = this.tablaPruebaConfig;
        // if (configuracionColumnas.columns.ANIO.hide === false) {
        //   configuracionColumnas.columns.ANIO.hide = true;
        //   configuracionColumnas.columns.MES.hide = true;
        // }
        // Se cambia el texto de los headers(solo los ultimos dos columnas)
        configuracionColumnas.columns.TOTAL1.title = 'Total de inscripciones';
        configuracionColumnas.columns.TOTAL2.title = 'Total errores';
        // Actualizar la configuracion original de la tabla con la configuracion
        // temporal auxiliar.
        this.tablaPruebaConfig = Object.assign({}, configuracionColumnas);
        break;
      }
      case 6: {
        this.txtCampo1 = 'Total de trámites';
        this.txtCampo2 = 'Total minutos';
        const configuracionColumnas = this.tablaPruebaConfig;
        // if (configuracionColumnas.columns.ANIO.hide === false) {
        //   configuracionColumnas.columns.ANIO.hide = true;
        //   configuracionColumnas.columns.MES.hide = true;
        // }
        // Se cambia el texto de los headers(solo los ultimos dos columnas)
        configuracionColumnas.columns.TOTAL1.title = 'Total de trámites';
        configuracionColumnas.columns.TOTAL2.title = 'Total minutos';
        // Actualizar la configuracion original de la tabla con la configuracion
        // temporal auxiliar.
        this.tablaPruebaConfig = Object.assign({}, configuracionColumnas);
        break;
      }
      case 7: {
        this.txtCampo1 = 'Total de trámites';
        this.txtCampo2 = 'Total de errores';
        const configuracionColumnas = this.tablaPruebaConfig;
        // if (configuracionColumnas.columns.ANIO.hide === false) {
        //   configuracionColumnas.columns.ANIO.hide = true;
        //   configuracionColumnas.columns.MES.hide = true;
        // }
        // Se cambia el texto de los headers(solo los ultimos dos columnas)
        configuracionColumnas.columns.TOTAL1.title = 'Total de trámites';
        configuracionColumnas.columns.TOTAL2.title = 'Total de errores';
        // Actualizar la configuracion original de la tabla con la configuracion
        // temporal auxiliar.
        this.tablaPruebaConfig = Object.assign({}, configuracionColumnas);
        break;
      }
      case 8: {
        this.txtCampo1 = 'Total de trámites';
        this.txtCampo2 = 'Total de errores';
        const configuracionColumnas = this.tablaPruebaConfig;
        // if (configuracionColumnas.columns.ANIO.hide === false) {
        //   configuracionColumnas.columns.ANIO.hide = true;
        //   configuracionColumnas.columns.MES.hide = true;
        // }
        // Se cambia el texto de los headers(solo los ultimos dos columnas)
        configuracionColumnas.columns.TOTAL1.title = 'Total de trámites';
        configuracionColumnas.columns.TOTAL2.title = 'Total de errores';
        // Actualizar la configuracion original de la tabla con la configuracion
        // temporal auxiliar.
        this.tablaPruebaConfig = Object.assign({}, configuracionColumnas);
        break;
      }
    }
  }
}
