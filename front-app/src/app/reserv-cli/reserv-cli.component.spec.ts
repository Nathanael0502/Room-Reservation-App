import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservCliComponent } from './reserv-cli.component';

describe('ReservCliComponent', () => {
  let component: ReservCliComponent;
  let fixture: ComponentFixture<ReservCliComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservCliComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservCliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
