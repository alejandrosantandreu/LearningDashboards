import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackMenuComponent } from './back-menu.component';

describe('BackMenuComponent', () => {
  let component: BackMenuComponent;
  let fixture: ComponentFixture<BackMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BackMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
