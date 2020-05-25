import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

interface UserNameAvailableResponse {
  available: boolean;
}

interface SignupCredentials {
  username: string,
  password: string,
  passwordConfirmation: string
}

interface SigninCredentials {
  username: string,
  password: string
}

interface SignupResponse {
  username: string;
}

interface SignedInResponse {
  authenticated: boolean;
  username: string;
}

interface SingInResponse {
  username: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  rootUrl = 'https://api.angular-email.com';
  // BehaviorSubject improves on regular Subject in that it can store a value AND
  // deliver it immediately to new subscribers; ie, we can check it at any time
  // to see if a user is signed in. '$' is a conventional but optional way of
  // signifying something that is an observable or observable-like.
  signedin$ = new BehaviorSubject(null); // 'null' to indicate that the auth status hasn't been checked yet
  username = '';

  constructor(private http: HttpClient) { }

  userNameAvailable(username: string) {
    return this.http.post<UserNameAvailableResponse>(this.rootUrl + '/auth/username', {
      username: username
    })
  }

  signup(credentials: SignupCredentials) {
    return this.http.post<SignupResponse>(this.rootUrl + '/auth/signup', credentials
    ).pipe(
      tap(({ username }) => { // If err in signing up, this never runs
        this.signedin$.next(true);
        this.username = username;
      })
    )
  }

  checkAuth() {
    return this.http.get<SignedInResponse>(`${this.rootUrl}/auth/signedin`)
    .pipe(
      tap(({ authenticated, username }) => {
        this.signedin$.next(authenticated);
        this.username = username;
      })
    )
  }

  signout() {
    return this.http.post(`${this.rootUrl}/auth/signout`, {}) // post req always needs a body, even if empty
      .pipe(
        tap(() => {
          this.signedin$.next(false);
        })
      )
  }

  signin(credentials: SigninCredentials) {
    return this.http.post<SingInResponse>(`${this.rootUrl}/auth/signin`, credentials)
      .pipe(
        tap(({ username }) => { // err skips tap, so this won't run if err
          this.signedin$.next(true);
          this.username = username;
        })
      )
  }

}
