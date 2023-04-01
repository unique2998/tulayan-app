import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTenantDialogComponent } from './new-tenant-dialog.component';

describe('NewTenantDialogComponent', () => {
  let component: NewTenantDialogComponent;
  let fixture: ComponentFixture<NewTenantDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewTenantDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewTenantDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
