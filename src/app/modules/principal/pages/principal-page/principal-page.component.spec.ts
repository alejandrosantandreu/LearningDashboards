import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrincipalPageComponent } from './principal-page.component';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { NgxEchartsModule } from 'ngx-echarts';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { GroupService } from '@modules/principal/services/group.service';
import { SharedModule } from '@shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('PrincipalPageComponent', () => {
  let component: PrincipalPageComponent;
  let fixture: ComponentFixture<PrincipalPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        NgxEchartsModule,
        DialogModule,
        ButtonModule,
        HttpClientModule,
        SharedModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        NoopAnimationsModule,
      ],
      declarations: [ PrincipalPageComponent ],
      providers: [ GroupService ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrincipalPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
