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
  // products: Product[] = [];
  private customerSubject = new BehaviorSubject<Customer | null>(null);
  private leadSubject = new BehaviorSubject<Lead | null>(null);
  // private productSubject = new BehaviorSubject<Product | null>(null);


  unsubCustomers;
  unsubLeads;



  firestore: Firestore = inject(Firestore);

  constructor() {
    this.unsubCustomers = this.subCustomersList();
    this.unsubLeads = this.subLeadsList();


  }


  ngOnDestroy() {
    this.unsubCustomers();

  }

  async addItem(collectionName: string, item: any) {
    try {
      const collectionRef = collection(this.firestore, collectionName);
      await addDoc(collectionRef, item);
      console.log(`${collectionName} erfolgreich hinzugefügt`);
    } catch (error) {
      console.error(`Fehler beim Hinzufügen von ${collectionName}:`, error);
    }
  }

  // async addCustomer(item: any) {
  //   await addDoc(this.getCustomersRef(), item).catch(
  //     (err) => { console.log(err) }
  //   )
  // }


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

  subLeadsList() {
    const q = query(this.getleadsRef())
    return onSnapshot(q, (list) => {
      this.leads = [];
      list.forEach(element => {
        this.leads.push(new Lead(element.id, element.data()));
      });
    });
  }

  getleadsRef() {
    return collection(this.firestore, 'leads')
  }

  getCustomersRef() {
    return collection(this.firestore, 'customers')
  }


  getSingleDocRef(colId: string, docId: string) {
    return doc(collection(this.firestore, colId), docId);
  }

}
