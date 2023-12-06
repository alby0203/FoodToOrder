import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterUserComponent } from './filter-user.component';

describe('FilterUserComponent', () => {
  let component: FilterUserComponent;
  let fixture: ComponentFixture<FilterUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FilterUserComponent]
    });
    fixture = TestBed.createComponent(FilterUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
