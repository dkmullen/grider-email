import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take, skipWhile, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {
  constructor(private authService: AuthService, private router: Router) {}

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.signedin$.pipe(
      // null means auth status hasn't been determined, so we ignore all valules of null...
      skipWhile(value => value === null),
      // ...then take the first value that isn't null (ie true or false)
      // Using 'take' sort of marks the observable as 'complete' (even though it isn't really complete)
      // (Angular requires an observable returned from canLoad to be completed)
      take(1),
      tap((authenticated: boolean) => {
        if (!authenticated) {
          this.router.navigateByUrl('/');
        }
      })
    );
  }
}
