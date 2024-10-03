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
import { HttpClientModule } from '@angular/common/http';
import { CallbackPipe } from './pipes/callback.pipe';


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
    CallbackPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
