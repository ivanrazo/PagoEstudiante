import { Directive, ElementRef, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appOnlynumbers]',
  standalone:true
})
export class OnlynumbersDirective {

   constructor(
    private el: ElementRef,
    private control: NgControl
  ) {}

  @HostListener('input')
  onInput(): void {
    const value = this.el.nativeElement.value.replace(/[^0-9]/g, '');
    this.el.nativeElement.value = value;
    this.control.control?.setValue(value, { emitEvent: false });
  }

}
