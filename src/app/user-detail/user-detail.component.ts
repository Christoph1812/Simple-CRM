import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { firebaseData } from '../firebase-services/firebaseData.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  constructor(public dialog: MatDialog, private route: ActivatedRoute, private firebaseData: firebaseData) { }

  userId: string = '';
  userData: any;


  ngOnInit() {
    const idFromRoute = this.route.snapshot.paramMap.get('id');

    if (idFromRoute !== null) {
      this.userId = idFromRoute;
    }

    this.subscribeToChanges();

  }

  subscribeToChanges(): void {
    this.firebaseData.subUser(this.userId);
    this.firebaseData.getUserObservable().subscribe((user) => {
      this.userData = user;
    });
  }



  editMenuUser() {
    this.dialog.open(DialogEditUserComponent, { data: this.userData });

  }



  editMenuAdress() {
    this.dialog.open(DialogEditAddressComponent);
  }
}



