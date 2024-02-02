import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { firebaseData } from '../firebase-services/firebaseData.service';
import { Router } from '@angular/router';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';

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
    return this.firebaseData.users;
  }


  navigateToUserDetails(userId: string) {
    this.router.navigate(['/user', userId]);
  }

  openDialog() {
    this.dialog.open(DialogAddUserComponent);
  }
}



