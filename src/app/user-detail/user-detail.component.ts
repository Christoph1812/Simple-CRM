import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../firebase-services/user.service';
import { Observable, map } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  constructor(public dialog: MatDialog, private route: ActivatedRoute, private userService: UserService) { }

  userId: string = '';
  userData$: Observable<any> | undefined;

  ngOnInit() {
    const idFromRoute = this.route.snapshot.paramMap.get('id');

    if (idFromRoute !== null) {
      this.userId = idFromRoute;
      this.userData$ = this.userService.getUser(this.userId).pipe(
        map(user => {
          // Fügen Sie die userId zum Benutzerobjekt hinzu
          return { ...user, id: this.userId };
        })
      );


    }
  }


  editMenuUser() {
    if (this.userData$)
      this.userData$.subscribe(user => {
        if (user) {
          this.dialog.open(DialogEditUserComponent, { data: user });
        }
      });
  }



  editMenuAdress() {
    this.dialog.open(DialogEditAddressComponent);
  }
}



