import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCreateCompanyComponent } from './edit-create-company.component';

describe('EditCreateCompanyComponent', () => {
  let component: EditCreateCompanyComponent;
  let fixture: ComponentFixture<EditCreateCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCreateCompanyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCreateCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
