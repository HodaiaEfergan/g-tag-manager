import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCreateConfigurationComponent } from './edit-create-configuration.component';

describe('EditCreateConfigurationComponent', () => {
  let component: EditCreateConfigurationComponent;
  let fixture: ComponentFixture<EditCreateConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCreateConfigurationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCreateConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
