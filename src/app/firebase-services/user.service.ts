import { Injectable, OnDestroy, inject } from '@angular/core';
import { Firestore, addDoc, collection, doc, onSnapshot, updateDoc, orderBy, limit, where, query, getDoc, getDocs } from '@angular/fire/firestore';
import { User } from '../models/user.class';
import { BehaviorSubject, Observable, catchError, from, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserService implements OnDestroy {
  users: User[] = [];
  private userSubject = new BehaviorSubject<User | null>(null);


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


  async updateUser(user: any) {
    try {
      let docRef = this.getSingleDocRef('users', user.id);
      await updateDoc(docRef, user);
      console.log('Dokument erfolgreich aktualisiert');
    } catch (error) {
      console.error('Fehler beim Aktualisieren des Dokuments:', error);
    }
  }







  subUser(userId: string): void {
    const userDocRef = this.getSingleDocRef('users', userId);

    onSnapshot(userDocRef, (userDocSnap) => {
      const userData = userDocSnap.data() as User;
      this.userSubject.next(new User(userId, userData));
    });
  }

  getUserObservable(): BehaviorSubject<User | null> {
    return this.userSubject;
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


  getSingleDocRef(colId: string, docId: string) {
    return doc(collection(this.firestore, colId), docId);
  }

}
