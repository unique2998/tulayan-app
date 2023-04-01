import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPaymentDialogComponent } from './new-payment-dialog.component';

describe('NewPaymentDialogComponent', () => {
  let component: NewPaymentDialogComponent;
  let fixture: ComponentFixture<NewPaymentDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewPaymentDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewPaymentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
