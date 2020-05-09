import { Injectable } from '@angular/core';
import { AsyncValidator, FormControl } from '@angular/forms';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { AuthService } from '../auth.service';

// Injectable used here so we can get access to auth service and http client
// Normally not needed in a validator
@Injectable({ providedIn: 'root'})

export class UniqueUsername implements AsyncValidator {

    constructor(private authSerivce: AuthService) {}

    validate = (control: FormControl) => {
        const { value } = control;
        return this.authSerivce.userNameAvailable(value)
        .pipe(
            map((val) => {
                console.log(val); // Looking for { available: true }
                // PS, if an error is returned, it skips map, so this won't run,
                // therefore if it runs, it's good.
                return null;
            }),
            catchError((err) => {
                console.log(err);
                if (err.error.username) {
                    // of is a way of creating a new observable, and catchError has to return an observable
                    return of({ nonUniqueUsername: true });
                } else {
                    return of({ otherError: true });
                }
                
            })
        )
    }
}
