import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './components/login/login.component';
import {UnitListComponent} from './components/unit-list/unit-list.component';
import {MainComponent} from './components/main/main.component';
import {FormsModule} from '@angular/forms';
import {HttpService} from './service/http/http.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {UnitSettingsComponent} from './components/unit-settings/unit-settings.component';
import {HttpConfigInterceptor} from './interceptor/http-interceptor';
import {ChartsModule} from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UnitListComponent,
    MainComponent,
    UnitSettingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ChartsModule
  ],
  providers: [HttpService, {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpConfigInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
