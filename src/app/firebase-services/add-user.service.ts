import { Injectable, OnDestroy, inject } from '@angular/core';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { User } from '../model/user.class';

@Injectable({
  providedIn: 'root'
})

export class AddUserService implements OnDestroy {


  firestore: Firestore = inject(Firestore);

  constructor() { }

  async addUser(item: any) {
    await addDoc(this.getUsersRef(), item).catch(
      (err) => { console.log(err) }
    )
  }

  ngOnDestroy() {
  }

  getUsersRef() {
    return collection(this.firestore, 'users')
  }



}
