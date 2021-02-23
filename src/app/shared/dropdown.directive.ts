import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @HostBinding('class.open') open: boolean;

  constructor() { }

  @HostListener('click') onClick(event: Event) {
    console.log('click');
    this.open = !this.open;
  }

}
