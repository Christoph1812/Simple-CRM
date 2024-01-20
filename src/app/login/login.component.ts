import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../firebase-services/authentication.service';
import { createUserWithEmailAndPassword } from '@firebase/auth';
import { getAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm!: FormGroup;
  signupForm!: FormGroup;
  showLogin: boolean = false;
  showSignUp: boolean = false;



  constructor(private router: Router, private fb: FormBuilder, private authService: AuthenticationService) {
  }




  signUpUser() {
    const email = this.signupForm.get('email')!.value;
    const password = this.signupForm.get('password')!.value;
    console.log(`${email} und ${password}`);
    createUserWithEmailAndPassword(
      this.authService.auth,
      email,
      password
    );



  }

  ngOnInit() {
    this.createLoginForm();
    this.createSignUpForm();
  }


  private createLoginForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }


  private createSignUpForm() {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')!.value;
      const password = this.loginForm.get('password')!.value;
      console.log(`${email} und ${password}`);
    }
  }





  backToOptions() {
    this.showLogin = false;
    this.showSignUp = false;
  }

  redirectUser() {
    this.router.navigate(['/dashboard']);
  }

  loginAsGuest() {
    this.router.navigate(['/dashboard']);
  }



}
