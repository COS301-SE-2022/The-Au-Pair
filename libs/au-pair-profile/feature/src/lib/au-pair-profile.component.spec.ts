import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuPairProfileComponent } from './au-pair-profile.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { NavbarModule } from '@the-au-pair/shared/components/navbar';
import { RouterTestingModule} from '@angular/router/testing';
import { API } from '../../../../shared/api/api.service';
import { By } from '@angular/platform-browser';
import { NgxsModule, Store } from '@ngxs/store';
import { AppState } from '../../../../shared/ngxs/state';
import { of } from 'rxjs';
import { SetId } from '../../../../../libs/shared/ngxs/actions';

const apiMock = {
  getUser(){
    return of({})
  },
  getAuPair() {
    return of({})
  }
}

describe('AuPairProfileComponent', () => {
  let component: AuPairProfileComponent;
  let fixture: ComponentFixture<AuPairProfileComponent>;
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuPairProfileComponent],
    }).compileComponents();
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuPairProfileComponent],
      imports: [FormsModule,
        IonicModule,
        HttpClientTestingModule,
        NavbarModule,
        RouterTestingModule,
        NgxsModule.forRoot([AppState])
       ],
       providers:[
        {
          provide:API, useValue:apiMock
        }
      ]
    }).compileComponents();

    store = TestBed.inject(Store);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuPairProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should, have a redirect to the edit au pair profile page', () => {
    const href = fixture.debugElement.query(By.css('#change')).nativeElement
    .getAttribute('routerLink');
    expect(href).toEqual('/edit-au-pair-profile'); 
  });

  it('should, calculate an average rating of the au pair from their rating array given a valid array', async () =>{
    const expectedRating = 4;
    jest.spyOn(component, "getAverage").mockReturnValue(4);
    const average = await component.getAverage([3,5]);
    expect(average).toEqual(expectedRating);
  })

  it('should, return zero rating array given an empty array', async () =>{
    const expectedRating = 0;
    jest.spyOn(component, "getAverage").mockReturnValue(0);
    const average = await component.getAverage([]);
    expect(average).toEqual(expectedRating);
  })

  it('should, return zero rating array given an invalid array', async () =>{
    const expectedRating = 0;
    jest.spyOn(component, "getAverage").mockReturnValue(0);
    const average = await component.getAverage([0, -5, 6]);
    expect(average).toEqual(expectedRating);
  })

  it('should, return the users details from the api call', async () => {
    store.dispatch(new SetId("0101015077086"));
    jest.spyOn(apiMock, 'getUser').mockImplementation(()=>of(
      {
        id: "0101015077086",
        fname: "TestFN",
        sname: "TestSN",
        email: "test@gmail.com",
        address: "Test 123",
        registered: true,
        type: 2,
        password: "TestPassword",
        number: "0833332222",
        salt: "testsaltyes",
        latitude: 30,
        longitude: 30,
        suburb: "Midrand",
        gender: "male",
        fcmToken : "testFCMtoken",
        birth: "05/07/2004",
        warnings: 0,
        banned: "",
      }
    ));

    await component.ngOnInit();
    expect(component.aupairID).toEqual("0101015077086");
  })

  it('should, return the au pairs details from the api call', async () => {
    store.dispatch(new SetId("0101015077086"));
    jest.spyOn(apiMock, 'getAuPair').mockImplementation(()=>of(
      {
        id: "0101015077086",
        rating: [5],
        onShift: true,
        employer: "",
        costIncurred: 0,
        distTraveled: 0,
        payRate: 0,
        bio: "Test Bio",
        experience: "Test Experience",
        currentLong: 0.0,
        currentLat : 0.0,
        terminateDate: "",
      }
    ));

    await component.ngOnInit();
    expect(component.aupairID).toEqual("0101015077086");
  })
  
});
