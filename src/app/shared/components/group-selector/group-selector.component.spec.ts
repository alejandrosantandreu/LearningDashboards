import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupSelectorComponent } from './group-selector.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { MenubarModule } from 'primeng/menubar';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { GroupServiceService } from '@shared/services/group-service.service';

describe('GroupSelectorComponent', () => {
  let component: GroupSelectorComponent;
  let fixture: ComponentFixture<GroupSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterTestingModule,
        ButtonModule,
        MenubarModule,
        MultiSelectModule,
        DropdownModule
      ],
      declarations: [ GroupSelectorComponent ],
      providers: [
        GroupServiceService
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
