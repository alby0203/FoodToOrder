import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FliterOrderComponent } from './fliter-order.component';

describe('FliterOrderComponent', () => {
  let component: FliterOrderComponent;
  let fixture: ComponentFixture<FliterOrderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FliterOrderComponent]
    });
    fixture = TestBed.createComponent(FliterOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
