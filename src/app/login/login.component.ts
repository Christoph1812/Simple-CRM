import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../firebase-services/authentication.service';
import { createUserWithEmailAndPassword } from '@firebase/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { signInWithEmailAndPassword } from '@angular/fire/auth';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm!: FormGroup;
  signupForm!: FormGroup;
  showLogin: boolean = false; // show the login form
  showSignUp: boolean = false; // show the signup form
  hideLogin = true; // show or hide the login password
  hideSignup = true; // show or hide the signup password
  hideConfirm = true; // show or hide the confirm password


  /**
   * Creates an instance of LoginComponet.
   *
   * @constructor
   * @param {Router} router - The Angular router service.
   * @param {FormBuilder} fb - The Angular form builder service.
   * @param {AuthenticationService} authService - The authentication service.
   * @param {MatSnackBar} snackBar - The Angular Material snack bar service.
   */
  constructor(private router: Router, private fb: FormBuilder, private authService: AuthenticationService, private snackBar: MatSnackBar) {
  }


  /**
 * Initializes the component and calls functions to create
 * the login and signUp forms.
 */
  ngOnInit() {
    this.createLoginForm();
    this.createSignUpForm();
  }


  /**
   * Creates the login form with email and password fields.
   */
  createLoginForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }


  /**
   *  Creates the sign-up form with email, password, and confirmPassword fields.
   */
  createSignUpForm() {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)]],
      confirmPassword: ['', Validators.required],
    }, { validators: this.matchPassword });
  }


  /**
   * Validates if the password and confirmPassword fields match.
   *  @param {FormGroup} formGroup - The form group containing the password and confirmPassword fields.
   * @returns {ValidationErrors | null} Returns null if the passwords match, otherwise returns an object with 'passwordismatch' property set to true.
   */
  matchPassword(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordismatch: true };
  }


  /**
   * Sign up a new user and reset the form and shows the options.
   */
  async signUpUser() {
    const email = this.signupForm.get('email')!.value;
    const password = this.signupForm.get('password')!.value;
    try {
      await createUserWithEmailAndPassword(this.authService.auth, email, password);
      this.backToOptions();
      this.openSnackBar('Customer successfully registered', 'success');
    } catch (error: any) {
      this.openSnackBar('Error during customer registration: ' + error.message, 'error');
    } finally {
      this.signupForm.reset();
    }
  }


  /**
   * Loged in the user with email and password.
   */
  async loginUser() {
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')!.value;
      const password = this.loginForm.get('password')!.value;
      try {
        await signInWithEmailAndPassword(this.authService.auth, email, password);
        this.backToOptions();
        this.openSnackBar('A warm welcome', 'success');
        this.routeToDashboard();
      } catch (error: any) {
        this.openSnackBar('Error during customer Login: ' + error.message, 'error');
      }
    }
  }


  /**
   * Shows the login options.
   */
  backToOptions() {
    this.showLogin = false;
    this.showSignUp = false;
  }


  /**
   * Navigates to the dashboard. 
   */
  routeToDashboard() {
    this.router.navigate(['/dashboard']);
  }


  /**
   * Opened and closed a snackbar with sucess or error message.
   * @param message - message text
   * @param status - error or sucess mesage
   */
  openSnackBar(message: string, status: 'success' | 'error'): void {
    const panelClass = (status === 'success') ? 'success-snackbar' : 'error-snackbar';

    this.snackBar.open(message, 'Close', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: [panelClass],
    });
  }


}
