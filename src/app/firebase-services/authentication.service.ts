import { Injectable, inject, } from '@angular/core';
// import { initializeApp } from '@angular/fire/app';
// import { getAuth } from 'firebase/auth';
import { Auth } from '@angular/fire/auth';




@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public auth: Auth = inject(Auth);
  // firebaseConfig = {
  //   apiKey: "AIzaSyDQhNONRPOVEp-gq9aqEmBwWztuxSIDslE",
  //   authDomain: "simple-crm-a3027.firebaseapp.com",
  //   projectId: "simple-crm-a3027",
  //   storageBucket: "simple-crm-a3027.appspot.com",
  //   messagingSenderId: "303776556573",
  //   appId: "1:303776556573:web:19492c71444bfe650108f4",
  // };
  // app = initializeApp(this.firebaseConfig);
  // public auth = getAuth(this.app);

}
