import { Component } from '@angular/core';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';
import { MatDialogRef } from '@angular/material/dialog';
import { firebaseData } from '../firebase-services/firebaseData.service';

@Component({
  selector: 'app-dialog-edit-address',
  templateUrl: './dialog-edit-address.component.html',
  styleUrls: ['./dialog-edit-address.component.scss']
})
export class DialogEditAddressComponent {
  loading = false;




  constructor(private dialogRef: MatDialogRef<DialogEditUserComponent>, private firebaseData: firebaseData) { }



  closeDialog() {
    this.dialogRef.close();
  }
}
