import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Email } from './email';
import { EmailService } from './email.service';

@Injectable({
  providedIn: 'root'
})
export class EmailResolverService implements Resolve<Email> {

  constructor(private emailService: EmailService, private router: Router) { }

  // Activated route snapshot gives us a snapshot of the requested route which includes the id
  resolve(route: ActivatedRouteSnapshot) {
    const { id } = route.params;

     return this.emailService.getEmail(id).pipe(
      catchError(() => {
        this.router.navigateByUrl('/inbox/not-found');
        // catchError is supposed to return an observable, but we don't have anything we
        // need to do with the specific error that comes from it, so rxjs provides this 
        // empty observable for just such things
        return EMPTY;
      })
     )
  }
}
