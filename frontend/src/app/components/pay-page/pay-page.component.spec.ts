import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayPageComponent } from './pay-page.component';

describe('PayPageComponent', () => {
  let component: PayPageComponent;
  let fixture: ComponentFixture<PayPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PayPageComponent]
    });
    fixture = TestBed.createComponent(PayPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
