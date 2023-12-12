import { Component } from '@angular/core';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../firebase-services/user.service';

@Component({
  selector: 'app-dialog-edit-address',
  templateUrl: './dialog-edit-address.component.html',
  styleUrls: ['./dialog-edit-address.component.scss']
})
export class DialogEditAddressComponent {
  loading = false;




  constructor(private dialogRef: MatDialogRef<DialogEditUserComponent>, private userService: UserService) { }



  closeDialog() {
    this.dialogRef.close();
  }
}
