import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { UserService } from '../firebase-services/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent {
  displayedColumns: string[] = ['name', 'eMail', 'city'];


  constructor(public dialog: MatDialog, private userService: UserService, private router: Router) {

  }


  getList() {
    return this.userService.users;
  }


  navigateToUserDetails(userId: string) {
    this.router.navigate(['/user', userId]);
  }

  openDialog() {
    this.dialog.open(DialogAddUserComponent);
  }
}

