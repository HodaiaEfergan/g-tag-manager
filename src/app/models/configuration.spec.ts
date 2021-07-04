import { Configuration } from './configuration';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from '../app.component';
//import { AppComponent }  from './unit-list.component';

describe('Configuration', () => {
  it('should create an instance', () => {
    expect(new Configuration()).toBeTruthy();
  });
});


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }

