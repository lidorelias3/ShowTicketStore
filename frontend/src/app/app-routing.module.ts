import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ManagmentPageComponent } from './components/managment-page/managment-page.component';
import { MyCartComponent } from './components/my-cart/my-cart.component';
import { PayPageComponent } from './components/pay-page/pay-page.component';
import { isAdminGuard } from './guards/is-admin.guard';
import { ShowComponent } from './components/show/show.component';
import { PurchaseHistoryComponent } from './components/purchase-history/purchase-history.component';
import { AboutPageComponent } from './components/about-page/about-page.component';
import { isAuthenticatedGuard } from './guards/is-authenticated.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'management-page', component: ManagmentPageComponent, canActivate: [isAdminGuard]},
  { path: 'shows/:id', component: ShowComponent},
  { path: 'my-cart', component: MyCartComponent },
  { path: 'pay', component: PayPageComponent, canActivate: [isAuthenticatedGuard]},
  { path: 'history', component: PurchaseHistoryComponent, canActivate: [isAuthenticatedGuard]},
  { path: 'about', component: AboutPageComponent },
  { path: '', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
