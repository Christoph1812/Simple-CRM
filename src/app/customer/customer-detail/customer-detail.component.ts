import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { firebaseData } from '../../firebase-services/firebaseData.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditCustomerComponent } from '../dialog-edit-customer/dialog-edit-customer.component';



@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss']
})
export class CustomerDetailComponent implements OnInit {

  constructor(public dialog: MatDialog, private route: ActivatedRoute, private firebaseData: firebaseData) { }

  customerId: string = '';
  customerData: any;


  ngOnInit() {
    const idFromRoute = this.route.snapshot.paramMap.get('id');

    if (idFromRoute !== null) {
      this.customerId = idFromRoute;
    }

    this.subscribeToChanges();

  }

  subscribeToChanges(): void {
    this.firebaseData.subCustomer(this.customerId);
    this.firebaseData.getCustomerObservable().subscribe((customer) => {
      this.customerData = customer;
    });
  }



  editMenuCustomer() {
    this.dialog.open(DialogEditCustomerComponent, { data: this.customerData });

  }




}



