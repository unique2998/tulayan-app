import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateUserinfoDialogComponent } from './update-userinfo-dialog.component';

describe('UpdateUserinfoDialogComponent', () => {
  let component: UpdateUserinfoDialogComponent;
  let fixture: ComponentFixture<UpdateUserinfoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateUserinfoDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateUserinfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
