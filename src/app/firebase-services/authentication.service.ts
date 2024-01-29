import { Injectable, inject, } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';




@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private router: Router) {

  }

  public auth: Auth = inject(Auth);


  logout() {
    this.auth.signOut().then(() => {
      console.log('logout erfolgreich');
      this.router.navigate(['']);
    })
  }
}
