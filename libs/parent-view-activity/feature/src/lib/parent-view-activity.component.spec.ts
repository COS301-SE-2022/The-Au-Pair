import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ParentViewActivityComponent } from './parent-view-activity.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { API } from '../../../../shared/api/api.service';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { NavbarModule } from '@the-au-pair/shared/components/navbar';
import { RouterTestingModule } from "@angular/router/testing";
import { NgxsModule } from '@ngxs/store';
import { AppState } from '../../../../shared/ngxs/state';

describe('ParentViewActivityComponent', () => {
  let component: ParentViewActivityComponent;
  let fixture: ComponentFixture<ParentViewActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ParentViewActivityComponent],
      imports: [FormsModule,
        IonicModule,
        HttpClientTestingModule,
        NavbarModule,
        RouterTestingModule,
        NgxsModule.forRoot([AppState])
    ],
    providers: [API]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentViewActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
