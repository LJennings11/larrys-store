import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutListingComponent } from './checkout-listing.component';

describe('CheckoutListingComponent', () => {
  let component: CheckoutListingComponent;
  let fixture: ComponentFixture<CheckoutListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckoutListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
