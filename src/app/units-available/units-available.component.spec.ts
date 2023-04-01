import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitsAvailableComponent } from './units-available.component';

describe('UnitsAvailableComponent', () => {
  let component: UnitsAvailableComponent;
  let fixture: ComponentFixture<UnitsAvailableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnitsAvailableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnitsAvailableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
