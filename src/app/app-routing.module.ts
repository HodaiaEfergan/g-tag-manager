import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {UnitListComponent} from './components/unit-list/unit-list.component';
import {MainComponent} from './components/main/main.component';
import {LoginComponent} from './components/login/login.component';
import {AuthGuardService} from './service/guard/auth-guard.service';
import {UnitSettingsComponent} from './components/unit-settings/unit-settings.component';

const routes: Routes = [
  {
    path: '', component: MainComponent, canActivate: [AuthGuardService], children: [
      {path: '', component: UnitListComponent},
      {path: 'unit-settings', component: UnitSettingsComponent},
    ]
  },
  {path: 'login', component: LoginComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
