import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { firebaseData } from '../../firebase-services/firebaseData.service';

@Component({
  selector: 'app-dialog-add-lead',
  templateUrl: './dialog-add-lead.component.html',
  styleUrls: ['./dialog-add-lead.component.scss']
})
export class DialogAddLeadComponent {
  constructor(private dialogRef: MatDialogRef<DialogAddLeadComponent>, private firebaseData: firebaseData) { }
}
