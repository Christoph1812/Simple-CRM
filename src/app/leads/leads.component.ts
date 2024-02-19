import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { firebaseData } from '../firebase-services/firebaseData.service';
import { Router } from '@angular/router';
import { DialogAddLeadComponent } from './dialog-add-lead/dialog-add-lead.component';
import { Lead } from '../models/lead.class';

@Component({
  selector: 'app-leads',
  templateUrl: './leads.component.html',
  styleUrls: ['./leads.component.scss']
})
export class LeadsComponent {
  displayedColumns: string[] = ['company', 'location', 'priority'];
  leads: Lead[] = [];

  constructor(public dialog: MatDialog, private firebaseData: firebaseData, private router: Router) {

  }

  ngOnInit() {
    this.leads = this.firebaseData.leads;
  }

  getList() {
    return this.firebaseData.leads;
  }


  navigateToCustomerDetails(customerId: string) {
    this.router.navigate(['/customer', customerId]);
  }

  openDialog() {
    this.dialog.open(DialogAddLeadComponent);
  }
}



