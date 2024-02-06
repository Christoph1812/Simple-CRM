import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { firebaseData } from '../../firebase-services/firebaseData.service';


@Component({
  selector: 'app-dialog-edit-customer',
  templateUrl: './dialog-edit-customer.component.html',
  styleUrls: ['./dialog-edit-customer.component.scss']
})
export class DialogEditCustomerComponent {
  loading = false;
  customerData: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<DialogEditCustomerComponent>, private firebaseData: firebaseData) {
    this.customerData = { ...data };
  }

  async saveCustomer() {
    this.loading = true;
    try {
      this.firebaseData.updateCustomer(this.customerData);
      console.log('updateCustomer erfolgreich ausgeführt');

      this.dialogRef.close();
    } catch (error) {
      console.error('Fehler beim updateCustomer:', error);
    }
    this.loading = false;
  };

  closeDialog() {
    this.dialogRef.close();
  }
}
