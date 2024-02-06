import { Injectable, OnDestroy, inject } from '@angular/core';
import { Firestore, addDoc, collection, doc, onSnapshot, updateDoc, query } from '@angular/fire/firestore';
import { Customer } from '../models/customer.class';
import { Lead } from '../models/lead.class';
import { Product } from '../models/product.class';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class firebaseData implements OnDestroy {
  customers: Customer[] = [];
  leads: Lead[] = [];
  products: Product[] = [];
  private customerSubject = new BehaviorSubject<Customer | null>(null);


  unsubCustomers;


  firestore: Firestore = inject(Firestore);

  constructor() {
    this.unsubCustomers = this.subCustomersList();

  }


  ngOnDestroy() {
    this.unsubCustomers();

  }



  async addCustomer(item: any) {
    await addDoc(this.getCustomersRef(), item).catch(
      (err) => { console.log(err) }
    )
  }


  async updateCustomer(customer: any) {
    try {
      let docRef = this.getSingleDocRef('customers', customer.id);
      await updateDoc(docRef, customer);
      console.log('Dokument erfolgreich aktualisiert');
    } catch (error) {
      console.error('Fehler beim Aktualisieren des Dokuments:', error);
    }
  }


  subCustomer(customerId: string): void {
    const customerDocRef = this.getSingleDocRef('customers', customerId);

    onSnapshot(customerDocRef, (customerDocSnap) => {
      const customerData = customerDocSnap.data() as Customer;
      this.customerSubject.next(new Customer(customerId, customerData));
    });
  }

  getCustomerObservable(): BehaviorSubject<Customer | null> {
    return this.customerSubject;
  }

  subCustomersList() {
    const q = query(this.getCustomersRef())
    return onSnapshot(q, (list) => {
      this.customers = [];
      list.forEach(element => {
        this.customers.push(new Customer(element.id, element.data()));
      });
    });
  }



  getCustomersRef() {
    return collection(this.firestore, 'customers')
  }


  getSingleDocRef(colId: string, docId: string) {
    return doc(collection(this.firestore, colId), docId);
  }

}
