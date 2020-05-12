import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';
// import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  signedin = false;
  // Another way to do this - see commented out lines
  // signedin$: BehaviorSubject<boolean>;

  constructor(private authService: AuthService) {
    // this.signedin$ = this.authService.signedin$;
    // then would eleminate the ngOninit, and reference signedin$ in the 
    // template with the async pipe, which allows us to listen to observables
    // directly in the template. But I don't like to have too much logic
    // in the template
  }

  ngOnInit() {
    this.authService.signedin$.subscribe((signedin) => {
      this.signedin = signedin;
    })

    this.authService.checkAuth().subscribe(res => {

    })
  }
}
