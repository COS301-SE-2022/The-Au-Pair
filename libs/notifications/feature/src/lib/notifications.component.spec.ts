import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { API } from '../../../../shared/api/api.service';
import { ParentNotificationsComponent } from './notifications.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NavbarModule } from '@the-au-pair/shared/components/navbar';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxsModule } from '@ngxs/store';
import { AppState } from '../../../../shared/ngxs/state';

describe('ParentNotificationsComponent', () => {
  let component: ParentNotificationsComponent;
  let fixture: ComponentFixture<ParentNotificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule,
        IonicModule,
        HttpClientTestingModule,
        NavbarModule,
        RouterTestingModule,
        NgxsModule.forRoot([AppState])
       ],
       providers:[API]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
