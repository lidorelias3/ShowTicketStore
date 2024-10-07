import { LOCALE_ID, NgModule } from '@angular/core';
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
import { ManageModelsComponent } from './components/admin-page/manage-models/manage-models.component';
import { ManageEventsComponent } from './components/admin-page/manage-events/manage-events.component';
import { ManageVenuesComponent } from './components/admin-page/manage-venues/manage-venues.component';
import { ManageUsersComponent } from './components/admin-page/manage-users/manage-users.component';

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
    ManageModelsComponent,
    ManageEventsComponent,
    ManageVenuesComponent,
    ManageUsersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
