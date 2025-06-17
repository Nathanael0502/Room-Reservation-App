import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SousChambreComponent } from './sous-chambre.component';

describe('SousChambreComponent', () => {
  let component: SousChambreComponent;
  let fixture: ComponentFixture<SousChambreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SousChambreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SousChambreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
