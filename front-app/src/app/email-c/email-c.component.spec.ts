import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailCComponent } from './email-c.component';

describe('EmailCComponent', () => {
  let component: EmailCComponent;
  let fixture: ComponentFixture<EmailCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmailCComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
