import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeCIndispoComponent } from './liste-cindispo.component';

describe('ListeCIndispoComponent', () => {
  let component: ListeCIndispoComponent;
  let fixture: ComponentFixture<ListeCIndispoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeCIndispoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeCIndispoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
