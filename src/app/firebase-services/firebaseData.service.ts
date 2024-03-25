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
  //customer
  customers: Customer[] = [];
  private customerSubject = new BehaviorSubject<Customer | null>(null);

  //lead
  leads: Lead[] = [];
  private leadSubject = new BehaviorSubject<Lead[]>([]);

  // Variables to hold unsubscribe functions for Item subscriptions
  unsubCustomers;
  unsubLeads;



  firestore: Firestore = inject(Firestore);

  /**
   * Construktuor initializes the unsubscribe funktions
   */
  constructor() {
    this.unsubCustomers = this.subCustomersList();
    this.unsubLeads = this.subLeadsList();

  }


  ngOnDestroy() {
    this.unsubCustomers();
  }

  /**
   * Asynchronously adds an item to the specified Firestore collection.
   * @param collectionName The name of the collection to add the item to.
   * @param item The item to add to the collection.
   */
  async addItem(collectionName: string, item: any) {
    try {
      const collectionRef = collection(this.firestore, collectionName);
      await addDoc(collectionRef, item);
      console.log(`${collectionName} erfolgreich hinzugefügt`);
    } catch (error) {
      console.error(`Fehler beim Hinzufügen von ${collectionName}:`, error);
    }
  }

  getSingleDocRef(colId: string, docId: string) {
    return doc(collection(this.firestore, colId), docId);
  }


  // Crud funktions for Leads
  private subLeadsList() {
    const q = query(collection(this.firestore, 'leads'));
    onSnapshot(q, (snapshot) => {
      const leads: Lead[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        leads.push(new Lead(doc.id, data));
      });
      // Aktualisiere das BehaviorSubject mit den neuen Lead-Daten
      this.leadSubject.next(leads);
    });
  }

  getLeadsObservable() {
    return this.leadSubject.asObservable();
  }

  // subLeadsList() {
  //   const q = query(this.getleadsRef())
  //   return onSnapshot(q, (list) => {
  //     this.leads = [];
  //     list.forEach(element => {
  //       this.leads.push(new Lead(element.id, element.data()));
  //     });
  //   });
  // }


  // getleadsRef() {
  //   return collection(this.firestore, 'leads')
  // }


  // getLeadsObservable(): BehaviorSubject<Lead[] | []> {
  //   return this.leadSubject;
  // }







  // Crud funktions for Customers
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



}
