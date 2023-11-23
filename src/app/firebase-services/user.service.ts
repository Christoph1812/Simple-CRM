import { Injectable, OnDestroy, inject } from '@angular/core';
import { Firestore, addDoc, collection, deleteDoc, doc, onSnapshot, updateDoc, orderBy, limit, where, query } from '@angular/fire/firestore';
import { User } from '../models/user.class';

@Injectable({
  providedIn: 'root'
})

export class UserService implements OnDestroy {
  users: User[] = [];

  unsubUsers;

  firestore: Firestore = inject(Firestore);

  constructor() {
    this.unsubUsers = this.subUsersList();
  }

  ngOnDestroy() {
    this.unsubUsers();
  }


  async addUser(item: any) {
    await addDoc(this.getUsersRef(), item).catch(
      (err) => { console.log(err) }
    )
  }


  subUsersList() {
    const q = query(this.getUsersRef())
    return onSnapshot(q, (list) => {
      this.users = [];
      list.forEach(element => {
        this.users.push(new User(element.id, element.data()));
      });
    });
  }


  getUsersRef() {
    return collection(this.firestore, 'users')
  }



}
