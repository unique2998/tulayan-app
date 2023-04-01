import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { TenantsComponent } from './tenants/tenants.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatTableModule} from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import {MatGridListModule} from '@angular/material/grid-list';
import { UnitsComponent } from './units/units.component';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import { NewTenantDialogComponent } from './new-tenant-dialog/new-tenant-dialog.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BillsComponent } from './bills/bills.component';
import {MatCardModule} from '@angular/material/card';
import { NewBillDialogComponent } from './new-bill-dialog/new-bill-dialog.component';
import { PaymentsComponent } from './payments/payments.component';
import { NewPaymentDialogComponent } from './new-payment-dialog/new-payment-dialog.component';
import { NewUnitDialogComponent } from './new-unit-dialog/new-unit-dialog.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { RegisterComponent } from './register/register.component';
import { SwiperModule } from "swiper/angular";
import { UnitsAvailableComponent } from './units-available/units-available.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { MyReservationsComponent } from './my-reservations/my-reservations.component';
import { ReservationRequestsComponent } from './reservation-requests/reservation-requests.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ParticularsComponent } from './particulars/particulars.component';
import { ParticularDialogComponent } from './particular-dialog/particular-dialog.component';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { ChangePasswordDialogComponent } from './change-password-dialog/change-password-dialog.component';
import { MyBillsComponent } from './my-bills/my-bills.component';
import { MyPaymentsComponent } from './my-payments/my-payments.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { UploadFileDialogComponent } from './upload-file-dialog/upload-file-dialog.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { RulesRegulationsComponent } from './rules-regulations/rules-regulations.component';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';
import {MatBadgeModule} from '@angular/material/badge';
import { UpdateUserinfoDialogComponent } from './update-userinfo-dialog/update-userinfo-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TenantsComponent,
    UnitsComponent,
    NewTenantDialogComponent,
    BillsComponent,
    NewBillDialogComponent,
    PaymentsComponent,
    NewPaymentDialogComponent,
    NewUnitDialogComponent,
    RegisterComponent,
    UnitsAvailableComponent,
    ConfirmationDialogComponent,
    MyReservationsComponent,
    ReservationRequestsComponent,
    ParticularsComponent,
    ParticularDialogComponent,
    HomeComponent,
    UsersComponent,
    ChangePasswordDialogComponent,
    MyBillsComponent,
    MyPaymentsComponent,
    FileUploadComponent,
    UploadFileDialogComponent,
    AboutUsComponent,
    ContactUsComponent,
    RulesRegulationsComponent,
    TermsConditionsComponent,
    UpdateUserinfoDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatTableModule,
    MatSortModule,
    MatGridListModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    MatCardModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatSnackBarModule,
    SwiperModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatBadgeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
