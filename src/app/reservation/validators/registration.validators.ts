import { FormControl, ɵFormControlCtor } from "@angular/forms"

export class RegistrationValidators {
    static priceValidator(control: FormControl): { [key: string]: any } | null {
        const price = control.value;
        if (price % 5 !== 0) {
          return { multipleOfFive: true };
        }
        return null;
      }
}

