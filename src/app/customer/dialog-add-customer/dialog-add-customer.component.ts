import { Component } from '@angular/core';
import { firebaseData } from '../../firebase-services/firebaseData.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Customer } from 'src/app/models/customer.class';

@Component({
  selector: 'app-dialog-add-customer',
  templateUrl: './dialog-add-customer.component.html',
  styleUrls: ['./dialog-add-customer.component.scss']
})
export class DialogAddCustomerComponent {
  loading = false;
  customer = new Customer();
  birthDate?: Date;

  constructor(private dialogRef: MatDialogRef<DialogAddCustomerComponent>, private firebaseData: firebaseData) { }

  saveCustomer() {
    this.loading = true;
    if (this.birthDate) {
      this.customer.birthDate = this.birthDate.getTime();
    }
    this.firebaseData.addItem('customers', this.customer.toJson());
    setTimeout(() => {
      this.loading = false;
      this.dialogRef.close();
    }, 900);
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
