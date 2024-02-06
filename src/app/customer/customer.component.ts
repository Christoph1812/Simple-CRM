import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddCustomerComponent } from './dialog-add-customer/dialog-add-customer.component';
import { firebaseData } from '../firebase-services/firebaseData.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
})
export class CustomerComponent {
  displayedColumns: string[] = ['name', 'eMail', 'city'];


  constructor(public dialog: MatDialog, private firebaseData: firebaseData, private router: Router) {

  }


  getList() {
    return this.firebaseData.customers;
  }


  navigateToCustomerDetails(customerId: string) {
    this.router.navigate(['/customer', customerId]);
  }

  openDialog() {
    this.dialog.open(DialogAddCustomerComponent);
  }
}

