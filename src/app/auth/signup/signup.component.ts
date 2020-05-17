import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatchPassword } from '../validators/match-password';
import { UniqueUsername } from '../validators/unique-username';
import { AuthService } from '../auth.service'; 

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  authForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern(/^[A-Za-z0-9]+$/)
      // async validators are in a third arg, an array
      // also, they aren't checked unless sync validators all pass
      // (to conserve resources, calls) Also, angular cancels
      // requests is the next keystroke makes the req moot, for example, 
      // when typing a user name. Each new char cancels the previous req and fires off a new one
    ], [this.uniqueUsername.validate]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20),
    ]),
    passwordConfirmation: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20),
    ])
  }, { validators: [this.matchPassword.validate]} )

  constructor(private matchPassword: MatchPassword, 
    private uniqueUsername: UniqueUsername, private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    if (this.authForm.invalid) {
      return;
    }
    this.authService.signup(this.authForm.value).subscribe({
      next: res => {
        this.router.navigateByUrl('/inbox');
      }, 
      error: (err) => {
        if (err.status === 0) {
          this.authForm.setErrors({ noConnection: true });
        } else {
          this.authForm.setErrors({ unknownError: true })
        }
      }
    });
  }

}
