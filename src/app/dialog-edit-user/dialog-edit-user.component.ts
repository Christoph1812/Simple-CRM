import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../firebase-services/user.service';
import { Observable } from 'rxjs';
import { User } from '../models/user.class';

@Component({
  selector: 'app-dialog-edit-user',
  templateUrl: './dialog-edit-user.component.html',
  styleUrls: ['./dialog-edit-user.component.scss']
})
export class DialogEditUserComponent {
  loading = false;
  userData: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<DialogEditUserComponent>, private userService: UserService) {
    this.userData = { ...data };
  }

  async saveUser() {
    this.loading = true;
    try {
      this.userService.updateUser(this.userData);
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
