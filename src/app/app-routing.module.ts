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

const routes: Routes = [
  {
    path: '', component: MainComponent, canActivate: [AuthGuardService], children: [
      {path: '', component: UnitListComponent},
      {path: 'unit-settings', component: UnitSettingsComponent},
      {path: 'login', component: LoginComponent},
      {path: 'configuration-list', component: ConfigurationListComponent},
      {path: 'edit-create-configuration', component: EditCreateConfigurationComponent},
    ]
  },
  {path: 'login', component: LoginComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes), FormsModule,
    ReactiveFormsModule],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
