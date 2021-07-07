import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './components/login/login.component';
import {UnitListComponent} from './components/unit-list/unit-list.component';
import {MainComponent} from './components/main/main.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpService} from './service/http/http.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {UnitSettingsComponent} from './components/unit-settings/unit-settings.component';
import {HttpConfigInterceptor} from './interceptor/http-interceptor';
import {ChartsModule} from 'ng2-charts';
import {SolutionComponent} from './components/solution/solution.component';
import {ManagerComponent} from './components/manager/manager.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {ConfigurationListComponent} from './components/configuration-list/configuration-list.component';
import {EditCreateConfigurationComponent} from './components/edit-create-configuration/edit-create-configuration.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {SampleViewComponent} from './components/sample-view/sample-view.component';
import {MatDialogModule} from '@angular/material/dialog';
import {OkDialogComponent} from './components/dialogs/ok-dialog/ok-dialog.component';
import {YesNoDialogComponent} from './components/dialogs/yes-no-dialog/yes-no-dialog.component';
import {DialogService} from './service/dialog/dialog.service';
import { UsersListComponent } from './components/admin/users-list/users-list.component';
import { EditCreateUserComponent } from './components/admin/edit-create-user/edit-create-user.component';
import {MatChipsModule} from '@angular/material/chips';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UnitListComponent,
    MainComponent,
    UnitSettingsComponent,
    SolutionComponent,
    ManagerComponent,
    ConfigurationListComponent,
    EditCreateConfigurationComponent,
    SampleViewComponent,
    OkDialogComponent,
    YesNoDialogComponent,
    UsersListComponent,
    EditCreateUserComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ChartsModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatDialogModule,
    MatChipsModule
    //RouterModule.forRoot(routes)
  ],
  providers: [DialogService, HttpService, {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpConfigInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}

function routes(routes: any): any[] | import('@angular/core').Type<any> | import('@angular/core').ModuleWithProviders<{}> {
  throw new Error('Function not implemented.');
}

