import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignedInComponent } from './signed-in.component';

describe('SignedInComponent', () => {
  let component: SignedInComponent;
  let fixture: ComponentFixture<SignedInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignedInComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignedInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
