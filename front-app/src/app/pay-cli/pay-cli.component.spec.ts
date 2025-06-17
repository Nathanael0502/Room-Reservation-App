import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayCliComponent } from './pay-cli.component';

describe('PayCliComponent', () => {
  let component: PayCliComponent;
  let fixture: ComponentFixture<PayCliComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PayCliComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayCliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
