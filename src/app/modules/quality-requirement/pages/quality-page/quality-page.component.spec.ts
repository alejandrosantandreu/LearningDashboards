import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QualityPageComponent } from './quality-page.component';

describe('QualityPageComponent', () => {
  let component: QualityPageComponent;
  let fixture: ComponentFixture<QualityPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QualityPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QualityPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
