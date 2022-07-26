import { ComponentFixture, TestBed } from '@angular/core/testing';
import { API } from '../../../../shared/api/api.service';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { NavbarModule } from '@the-au-pair/shared/components/navbar';
import { RouterTestingModule} from '@angular/router/testing';
import { NgxsModule } from '@ngxs/store';
import { AppState } from '../../../../shared/ngxs/state';
import { TrackAuPairComponent } from './track-au-pair.component';

describe('TrackAuPairComponent', () => {
  let component: TrackAuPairComponent;
  let fixture: ComponentFixture<TrackAuPairComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrackAuPairComponent],
      imports: [FormsModule,
        IonicModule,
        HttpClientTestingModule,
        NavbarModule,
        RouterTestingModule,
        NgxsModule.forRoot([AppState]),
        ],
        providers: [API]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackAuPairComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
