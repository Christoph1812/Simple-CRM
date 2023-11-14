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

  async addUser(item: any) {
    await addDoc(this.getUsersRef(), item).catch(
      (err) => { console.log(err) }
    )
  }


  subUsersList() {
    // Erstellen Sie eine Firestore-Abfrage, um die neuesten 4 Notizen zu erhalten
    const q = query(this.getUsersRef(), limit(4))
    return onSnapshot(q, (list) => {
      // Leert das "normalNotes"-Array und füllen  es mit aktualisierten Daten aus Firestore
      this.users = [];
      list.forEach(element => {
        this.users.push(new User(element.data()));
      });
    });
  }

  ngOnDestroy() {
    this.unsubUsers();
  }

  getUsersRef() {
    return collection(this.firestore, 'users')
  }



}
