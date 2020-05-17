import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service'; 

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  authForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern(/^[A-Za-z0-9]+$/)
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20),
    ]),
  });

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    if(this.authForm.invalid) {
      return;
    }
    
    this.authService.signin(this.authForm.value).subscribe({
      // usually I pass a function into subscribe, but can also pass an object with functions to run
      next: () => {
        this.router.navigateByUrl('/inbox');
      }, 
      error: ({ error }) => { // this api has an err property called 'error' so here we are destructuring it out
        if (error.username || error.password) {
          this.authForm.setErrors({ credentials: true });
        } else {
          this.authForm.setErrors({ unknownError: true })
        }
      }
    })
  }

}
