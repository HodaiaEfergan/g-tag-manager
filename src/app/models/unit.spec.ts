import { Unit } from './unit';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from '../app.component';
//import { AppComponent }  from './unit-list.component';

describe('Unit', () => {
  it('should create an instance', () => {
    expect(new Unit()).toBeTruthy();
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

}