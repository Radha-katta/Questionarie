import { AbstractControl } from "@angular/forms";


export function selectValidator(control: AbstractControl): {[key:string] : any} | null {
    debugger;
    let val = control.value;
    if(val != -1) {
        return null;
    }
    return  {'selectError': {value: control.value}};

}