import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { firebaseData } from '../firebase-services/firebaseData.service';


@Component({
  selector: 'app-dialog-edit-user',
  templateUrl: './dialog-edit-user.component.html',
  styleUrls: ['./dialog-edit-user.component.scss']
})
export class DialogEditUserComponent {
  loading = false;
  userData: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<DialogEditUserComponent>, private firebaseData: firebaseData) {
    this.userData = { ...data };
  }

  async saveUser() {
    this.loading = true;
    try {
      this.firebaseData.updateUser(this.userData);
      console.log('updateUser erfolgreich ausgeführt');

      this.dialogRef.close();
    } catch (error) {
      console.error('Fehler beim updateUser:', error);
    }
    this.loading = false;
  };

  closeDialog() {
    this.dialogRef.close();
  }
}
