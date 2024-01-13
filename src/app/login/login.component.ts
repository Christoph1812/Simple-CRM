import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  singupForm: FormGroup;
  showLogin: boolean = false;
  showSignUp: boolean = false;



  constructor(private router: Router, private fb: FormBuilder) {
    this.loginForm = this.createLoginForm();
    this.singupForm = this.createSignUpForm();
  }

  private createLoginForm(): FormGroup {
    return this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  private createSignUpForm(): FormGroup {
    return this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    });
  }


  loginAsGuest() {
    this.router.navigate(['/dashboard']);
  }


  openLogin() { }

  openSignUp() {

  }
}
