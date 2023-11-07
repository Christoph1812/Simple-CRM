import { Component } from '@angular/core';
import { User } from '../model/user.class';
import { AddUserService } from '../firebase-services/add-user.service';
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

  constructor(private dialogRef: MatDialogRef<DialogAddUserComponent>, private userService: AddUserService) { }

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
