import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormBaseComponent } from './components/form-base/form-base.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './home/home.component';
import { ManagmentPageComponent } from './managment-page/managment-page.component';
import { MyCartComponent } from './my-cart/my-cart.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'managment-page', component: ManagmentPageComponent },
  { path: 'my-cart', component: MyCartComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
