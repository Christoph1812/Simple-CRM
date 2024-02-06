import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { firebaseData } from '../firebase-services/firebaseData.service';
import { Router } from '@angular/router';
import { DialogAddCustomerComponent } from '../customer/dialog-add-customer/dialog-add-customer.component';

@Component({
  selector: 'app-leads',
  templateUrl: './leads.component.html',
  styleUrls: ['./leads.component.scss']
})
export class LeadsComponent {

  displayedColumns: string[] = ['company', 'location', 'priority'];

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



