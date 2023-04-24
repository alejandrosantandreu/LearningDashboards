import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphicTypeComponent } from './graphic-type.component';

describe('GraphicTypeComponent', () => {
  let component: GraphicTypeComponent;
  let fixture: ComponentFixture<GraphicTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraphicTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraphicTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
