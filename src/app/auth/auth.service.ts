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

interface SignupResponse {
  credentials: string;
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
  signedin$ = new BehaviorSubject(false);

  constructor(private http: HttpClient) { }

  userNameAvailable(username: string) {
    return this.http.post<UserNameAvailableResponse>(this.rootUrl + '/auth/username', {
      username: username
    })
  }

  signup(credentials: SignupCredentials) {
    return this.http.post<SignupResponse>(this.rootUrl + '/auth/signup', credentials
    ).pipe(
      tap(() => { // If err in signing up, this never runs
        this.signedin$.next(true);
      })
    )
  }

  checkAuth() {
    return this.http.get(`${this.rootUrl}/auth/signedin`)
    .pipe(
      tap((res) => {
        console.log(res)
      })
    )
  }

}
