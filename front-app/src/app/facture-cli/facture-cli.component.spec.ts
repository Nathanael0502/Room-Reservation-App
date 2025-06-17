import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FactureCliComponent } from './facture-cli.component';

describe('FactureCliComponent', () => {
  let component: FactureCliComponent;
  let fixture: ComponentFixture<FactureCliComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FactureCliComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FactureCliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
