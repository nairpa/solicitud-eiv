import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditVendedorComponent } from './add-edit-vendedor.component';

describe('AddEditVendedorComponent', () => {
  let component: AddEditVendedorComponent;
  let fixture: ComponentFixture<AddEditVendedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditVendedorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditVendedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
