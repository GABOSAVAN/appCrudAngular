import { AbstractControl, ValidatorFn, Validators } from '@angular/forms';

export const requiredValidator: ValidatorFn = (control: AbstractControl) => {
  return Validators.required(control) ? { required: true } : null;
};

export const numberValidator: ValidatorFn = (control: AbstractControl) => {
  const value = control.value;
  return isNaN(value) || value === null ? { number: true } : null;
};
