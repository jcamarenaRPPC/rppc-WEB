import {Directive, HostListener} from '@angular/core';

@Directive({
  selector: '[ngxNumbersOnly]',
})

export class AllowNumberDirective {
  regexStr = '^[0-9]+$';
  constructor() { }
  @HostListener('keypress', ['$event'])
  onKeyPress (event) {
    return new RegExp (this.regexStr).test(event.key);
  }
  // bloqueo de caracteres especiales de copiar y pegar
  @HostListener('paste', ['$event'])
  blockPaste (event: ClipboardEvent) {
    this.validateFields(event);
  }
  // validacion de datos que se pegan al campo
  validateFields (event: ClipboardEvent) {
    event.preventDefault();
    const pasteData = event.clipboardData.getData('text/plain').replace(/[^0-9]/g, '');
    document.execCommand('insertHTML', false, pasteData);
  }
}
