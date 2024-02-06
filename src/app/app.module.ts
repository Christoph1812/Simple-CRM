import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MenuComponent } from './menu/menu.component';
import { MatIconModule } from '@angular/material/icon';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CustomerComponent } from './customer/customer.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DialogAddCustomerComponent } from './customer/dialog-add-customer/dialog-add-customer.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';

import { MatMenuModule } from '@angular/material/menu';

import { SalesPipelineComponent } from './sales-pipeline/sales-pipeline.component';
import { ProductsComponent } from './products/products.component';
import { CalendarComponent } from './calendar/calendar.component';
import { LoginComponent } from './login/login.component';
import { LeadsComponent } from './leads/leads.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { LegalNoticeComponent } from './legal-notice/legal-notice.component';
import { DataProtectionComponent } from './data-protection/data-protection.component';
import { DialogAddLeadComponent } from './leads/dialog-add-lead/dialog-add-lead.component';
import { CustomerDetailComponent } from './customer/customer-detail/customer-detail.component';
import { DialogEditCustomerComponent } from './customer/dialog-edit-customer/dialog-edit-customer.component';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    DashboardComponent,
    CustomerComponent,
    DialogAddCustomerComponent,
    CustomerDetailComponent,
    DialogEditCustomerComponent,
    SalesPipelineComponent,
    ProductsComponent,
    CalendarComponent,
    LoginComponent,
    LeadsComponent,
    LegalNoticeComponent,
    DataProtectionComponent,
    DialogAddLeadComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    MatProgressBarModule,
    MatCardModule,
    MatTableModule,
    MatMenuModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    provideFirebaseApp(() => initializeApp({ "projectId": "simple-crm-a3027", "appId": "1:303776556573:web:19492c71444bfe650108f4", "storageBucket": "simple-crm-a3027.appspot.com", "apiKey": "AIzaSyDQhNONRPOVEp-gq9aqEmBwWztuxSIDslE", "authDomain": "simple-crm-a3027.firebaseapp.com", "messagingSenderId": "303776556573" })),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
