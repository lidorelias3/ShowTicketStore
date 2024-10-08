import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormBaseComponent } from './components/form-base/form-base.component';
import { FormsModule } from '@angular/forms';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { MyCartComponent } from './components/my-cart/my-cart.component';
import { ManagmentPageComponent } from './components/managment-page/managment-page.component';
import { HomeComponent } from './components/home/home.component';
import { PayPageComponent } from './components/pay-page/pay-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GaleryComponent } from './components/galery/galery.component';
import { ShowComponent } from './components/show/show.component';
import { DashboardOrdersByDateComponent } from './components/admin-page/dashboard-orders-by-date/dashboard-orders-by-date.component';
import { DashboardOrdersByEventComponent } from './components/admin-page/dashboard-orders-by-event/dashboard-orders-by-event.component';
import { ManageModelsComponent } from './components/admin-page/manage-models/manage-models.component';
import { ManageEventsComponent } from './components/admin-page/manage-events/manage-events.component';
import { ManageVenuesComponent } from './components/admin-page/manage-venues/manage-venues.component';
import { ManageUsersComponent } from './components/admin-page/manage-users/manage-users.component';
import { PurchaseHistoryComponent } from './components/purchase-history/purchase-history.component';
import { GoogleMapsModule } from '@angular/google-maps'; // Import Google Maps Module

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    FormBaseComponent,
    RegistrationComponent,
    LoginComponent,
    MyCartComponent,
    ManagmentPageComponent,
    HomeComponent,
    PayPageComponent,
    GaleryComponent,
    ShowComponent,
    DashboardOrdersByDateComponent,
    DashboardOrdersByEventComponent,
    ManageModelsComponent,
    ManageEventsComponent,
    ManageVenuesComponent,
    ManageUsersComponent,
    PurchaseHistoryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    GoogleMapsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
