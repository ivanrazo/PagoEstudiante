import { Directive, ElementRef, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appUppercaseThree]',
  standalone:true
})
export class UppercaseThreeDirective {

 constructor(
  private el: ElementRef,
  private control: NgControl
) {}

@HostListener('input')
onInput(): void {
  let value: string = this.el.nativeElement.value;

  value = value.replace(/[^A-Z0-9: - ,]/gi, '');

  value = value.toUpperCase();

  this.el.nativeElement.value = value;
  this.control.control?.setValue(value, { emitEvent: false });
}
}
