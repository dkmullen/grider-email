import { Injectable } from '@angular/core';
import { Validator, FormGroup } from '@angular/forms';

@Injectable({ providedIn: 'root'})
 // implements adds ts hints from Validator interface,for a validator, or oninit, etc
export class MatchPassword implements Validator {
    // if not sure to expect formGroup or FormControl, use control: AbstractControl as fallback
    validate(formGroup: FormGroup) {
        const { password, passwordConfirmation } = formGroup.value;
        if (password === passwordConfirmation) {
            return null;
        } else {
        // When this gets returned our form (formGroup) gets a property .errors === { passwordsDontMatch: true }
        return { passwordsDontMatch: true };
        }
    }
}
