import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CustomerComponent } from './customer/customer.component';
import { SalesPipelineComponent } from './sales-pipeline/sales-pipeline.component';
import { LeadsComponent } from './leads/leads.component';
import { LegalNoticeComponent } from './legal-notice/legal-notice.component';
import { DataProtectionComponent } from './data-protection/data-protection.component';
import { ProductsComponent } from './products/products.component';
import { CalendarComponent } from './calendar/calendar.component';
import { CustomerDetailComponent } from './customer/customer-detail/customer-detail.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'customer', component: CustomerComponent },
  { path: 'sales-pipeline', component: SalesPipelineComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'leads', component: LeadsComponent },
  { path: 'calendar', component: CalendarComponent },
  { path: 'data-protection', component: DataProtectionComponent },
  { path: 'legal-notice', component: LegalNoticeComponent },
  { path: 'customer/:id', component: CustomerDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
