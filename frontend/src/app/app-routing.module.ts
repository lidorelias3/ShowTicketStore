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
import { ManageModelsComponent } from './components/admin-page/manage-models/manage-models.component';
import { ManageEventsComponent } from './components/admin-page/manage-events/manage-events.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'management-page', component: ManagmentPageComponent},
  { path: 'shows/:id', component: ShowComponent},
  { path: 'my-cart', component: MyCartComponent },
  { path: 'pay', component: PayPageComponent },
  { path: '', component: ManageEventsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
