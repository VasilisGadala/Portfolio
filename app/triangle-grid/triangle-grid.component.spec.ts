import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TriangleGridComponent } from './triangle-grid.component';

describe('TriangleGridComponent', () => {
  let component: TriangleGridComponent;
  let fixture: ComponentFixture<TriangleGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TriangleGridComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TriangleGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
