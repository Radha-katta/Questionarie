import { Directive, HostBinding, Input, Optional } from '@angular/core';
import { ControlContainer, FormControl } from '@angular/forms';


@Directive({
  selector: 'label[controlName]'
})
export class LabelControlDirective {


  @Input() controlName: any;

  constructor(@Optional() private parent: ControlContainer) {}

  @HostBinding('textContent')
  get controlValue() {

  /*  if(this.parent && this.parent.control.get(this.controlName) ) {
      return this.parent.control.get(this.controlName).value;
    }
    return  '';
    */
   if(this.controlName instanceof FormControl) {
    return this.controlName.value;
   }
   return '';
   
  }
}
