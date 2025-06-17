import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationRealComponent } from './notification-real.component';

describe('NotificationRealComponent', () => {
  let component: NotificationRealComponent;
  let fixture: ComponentFixture<NotificationRealComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationRealComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificationRealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
