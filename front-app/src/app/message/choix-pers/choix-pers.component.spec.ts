import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoixPersComponent } from './choix-pers.component';

describe('ChoixPersComponent', () => {
  let component: ChoixPersComponent;
  let fixture: ComponentFixture<ChoixPersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChoixPersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChoixPersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
