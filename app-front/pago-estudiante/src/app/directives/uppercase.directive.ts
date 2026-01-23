import { Directive, ElementRef, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appUppercase]',
  standalone:true
})
export class UppercaseDirective {

  constructor(
    private el: ElementRef,
    private control: NgControl
  ) {}

  @HostListener('input')
  onInput(): void {
    let value: string = this.el.nativeElement.value;

    value = value.replace(/[^a-zA-ZñÑ ]/g, '');

    value = value.toUpperCase();

    this.el.nativeElement.value = value;
    this.control.control?.setValue(value, { emitEvent: false });
  }

}
