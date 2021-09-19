import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {UnitListComponent} from './components/unit-list/unit-list.component';
import {MainComponent} from './components/main/main.component';
import {LoginComponent} from './components/login/login.component';
import {AuthGuardService} from './service/guard/auth-guard.service';
import {UnitSettingsComponent} from './components/unit-settings/unit-settings.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ConfigurationListComponent} from './components/configuration-list/configuration-list.component';
import {EditCreateConfigurationComponent} from './components/edit-create-configuration/edit-create-configuration.component';
import {UsersListComponent} from './components/admin/users-list/users-list.component';
import {EditCreateUserComponent} from './components/admin/edit-create-user/edit-create-user.component';
import {ForgotPasswordComponent} from './components/forgot-password/forgot-password.component';
import {EditUnitComponent} from "./components/edit-unit/edit-unit.component";

const routes: Routes = [

  {
    path: '', component: MainComponent, canActivate: [AuthGuardService], children: [
      {path: '', component: UnitListComponent},
      {path: 'unit-settings', component: UnitSettingsComponent},
      {path: 'configuration-list', component: ConfigurationListComponent},
      {path: 'edit-create-configuration', component: EditCreateConfigurationComponent},
      {path: 'users', component: UsersListComponent},
      {path: 'edit-create-user', component: EditCreateUserComponent},
      {path: 'edit-unit', component: EditUnitComponent},
    ]
  },
  {path: 'login', component: LoginComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes), FormsModule,
    ReactiveFormsModule],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
