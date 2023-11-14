import { Component } from '@angular/core';
import { User } from '../models/user.class';
import { UserService } from '../firebase-services/user.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss']
})
export class DialogAddUserComponent {
  loading = false;
  user = new User();
  birthDate?: Date;

  constructor(private dialogRef: MatDialogRef<DialogAddUserComponent>, private userService: UserService) { }

  saveUser() {
    this.loading = true;
    if (this.birthDate) {
      this.user.birthDate = this.birthDate.getTime();
    }
    this.userService.addUser(this.user.toJason());
    setTimeout(() => {
      this.loading = false;
      this.dialogRef.close();
    }, 900);
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
