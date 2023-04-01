import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticularDialogComponent } from './particular-dialog.component';

describe('ParticularDialogComponent', () => {
  let component: ParticularDialogComponent;
  let fixture: ComponentFixture<ParticularDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParticularDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParticularDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
