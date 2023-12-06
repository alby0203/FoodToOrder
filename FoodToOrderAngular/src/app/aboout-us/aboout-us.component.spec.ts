import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbooutUsComponent } from './aboout-us.component';

describe('AbooutUsComponent', () => {
  let component: AbooutUsComponent;
  let fixture: ComponentFixture<AbooutUsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AbooutUsComponent]
    });
    fixture = TestBed.createComponent(AbooutUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
