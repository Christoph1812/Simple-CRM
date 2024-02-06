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
  showLogin: boolean = false;
  showSignUp: boolean = false;
  hideLogin = true;
  hideSignup = true;
  hideConfirm = true;


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

  createLoginForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }


  createSignUpForm() {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)]],
      confirmPassword: ['', Validators.required],
    }, { validators: this.matchPassword });
  }


  matchPassword(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }


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


  backToOptions() {
    this.showLogin = false;
    this.showSignUp = false;
  }


  routeToDashboard() {
    this.router.navigate(['/dashboard']);
  }




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
