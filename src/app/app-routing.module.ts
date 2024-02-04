import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { SalesPipelineComponent } from './sales-pipeline/sales-pipeline.component';
import { LeadsComponent } from './leads/leads.component';
import { LegalNoticeComponent } from './legal-notice/legal-notice.component';
import { DataProtectionComponent } from './data-protection/data-protection.component';
import { ProductsComponent } from './products/products.component';
import { CalendarComponent } from './calendar/calendar.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'user', component: UserComponent },
  { path: 'sales-pipeline', component: SalesPipelineComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'user', component: UserComponent },
  { path: 'leads', component: LeadsComponent },
  { path: 'calender', component: CalendarComponent },
  { path: 'data-protection', component: DataProtectionComponent },
  { path: 'legal-notice', component: LegalNoticeComponent },
  { path: 'user/:id', component: UserDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
