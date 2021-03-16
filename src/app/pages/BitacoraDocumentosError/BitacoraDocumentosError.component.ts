import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-bitacora-documentos-error',
  templateUrl: './BitacoraDocumentosError.component.html',
  styleUrls: ['./BitacoraDocumentosError.component.scss'],
})
export class BitacoraDocumentosErrorComponent implements OnInit {
  // Crear variables ngmodel.
  Fecha = new Date();

  constructor() { }

  ngOnInit(): void {
  }

}
