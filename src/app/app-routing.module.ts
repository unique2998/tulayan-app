import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TenantsComponent } from './tenants/tenants.component';
import { UnitsComponent } from './units/units.component';
import { BillsComponent } from './bills/bills.component';
import { PaymentsComponent } from './payments/payments.component';
import { authGuard, authGuardTenants, authGuardGeneral } from './auth.guard';
import { RegisterComponent } from './register/register.component';
import { UnitsAvailableComponent } from './units-available/units-available.component';
import { MyReservationsComponent } from './my-reservations/my-reservations.component';
import { ReservationRequestsComponent } from './reservation-requests/reservation-requests.component';
import { ParticularsComponent } from './particulars/particulars.component';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { MyBillsComponent } from './my-bills/my-bills.component';
import { MyPaymentsComponent } from './my-payments/my-payments.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { RulesRegulationsComponent } from './rules-regulations/rules-regulations.component';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';

const routes: Routes = [
  {path: '', component: HomeComponent, canActivate: [authGuardGeneral]},
  {path: 'rules-regulations', component: RulesRegulationsComponent, canActivate: [authGuardGeneral]},
  {path: 'terms-conditions', component: TermsConditionsComponent, canActivate: [authGuardGeneral]},
  {path: 'about-us', component: AboutUsComponent, canActivate: [authGuardGeneral]},
  {path: 'contact-us', component: ContactUsComponent, canActivate: [authGuardGeneral]},
  {path: 'login', component: LoginComponent, canActivate: [authGuardGeneral]},
  {path: 'register', component: RegisterComponent},
  {path: 'tenants', component: TenantsComponent, canActivate: [authGuard]},
  {path: 'tenants/:id/bills', component: BillsComponent, canActivate: [authGuard]},
  {path: 'units', component: UnitsComponent, canActivate: [authGuard]},
  {path: 'users', component: UsersComponent, canActivate: [authGuard]},
  {path: 'particulars', component: ParticularsComponent, canActivate: [authGuard]},
  {path: 'reservation-requests', component: ReservationRequestsComponent, canActivate: [authGuard]},
  {path: 'tenants/:id/bills/:bill_id/payments', component: PaymentsComponent, canActivate: [authGuard]},
  {path: 'units-available', component: UnitsAvailableComponent, canActivate: [authGuardTenants]},
  {path: 'my-reservations', component: MyReservationsComponent, canActivate: [authGuardTenants]},
  {path: 'my-bills', component: MyBillsComponent, canActivate: [authGuardTenants]},
  {path: 'my-payments/:bill_id', component: MyPaymentsComponent, canActivate: [authGuardTenants]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
