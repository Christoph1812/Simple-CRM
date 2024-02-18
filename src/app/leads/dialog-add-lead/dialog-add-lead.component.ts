import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { firebaseData } from '../../firebase-services/firebaseData.service';
import { Lead } from 'src/app/models/lead.class';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-dialog-add-lead',
  templateUrl: './dialog-add-lead.component.html',
  styleUrls: ['./dialog-add-lead.component.scss']
})
export class DialogAddLeadComponent {
  loading = false;
  lead = new Lead();

  constructor(private dialogRef: MatDialogRef<DialogAddLeadComponent>, private firebaseData: firebaseData) {
  }


  closeDialog() {
    this.dialogRef.close
  }

  saveData() {
    this.loading = true;
    this.firebaseData.addItem('leads', this.lead.toJson());
    setTimeout(() => {
      this.loading = false;
      this.dialogRef.close();
    }, 900);
  }
}
