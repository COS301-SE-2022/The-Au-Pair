import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ParentProfileComponent } from './parent-profile.component';
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
import { SetId } from 'libs/shared/ngxs/actions';

const apiMock = {
  getUser(){
    return of({})
  },
  getParent() {
    return of({})
  },
  getMedAid() {
    return of({})
  }
}

describe('ParentProfileComponent', () => {
  let component: ParentProfileComponent;
  let fixture: ComponentFixture<ParentProfileComponent>;
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ParentProfileComponent],
    }).compileComponents();
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ParentProfileComponent],
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
    fixture = TestBed.createComponent(ParentProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should, have a redirect to the edit parent profile page', () => {
    const href = fixture.debugElement.query(By.css('#change')).nativeElement
    .getAttribute('routerLink');
    expect(href).toEqual('/edit-parent-profile'); 
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
        type: 1,
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
    expect(component.parentID).toEqual("0101015077086");
  })

  it('should, return the parents details from the api call', async () => {
    store.dispatch(new SetId("0101015077086"));
    jest.spyOn(apiMock, 'getParent').mockImplementation(()=>of(
      {
        id: "0101015077086",
        children: [],
        medID: "",
        auPair: "",
        rating: [5]
      }
    ));

    await component.ngOnInit();
    expect(component.parentID).toEqual("0101015077086");
  })

  it('should, return the parents details from the api call', async () => {
    store.dispatch(new SetId("0101015077086"));
    jest.spyOn(apiMock, 'getMedAid').mockImplementation(()=>of(
      {
        id: "0101015077086",
        plan: "Full",
        name: "TestFN",
        sname: "TestSN",
        mID: "0101015077087",
        provider: "Test Provider",
      }
    ));

    await component.ngOnInit();
    expect(component.parentID).toEqual("0101015077086");
  })
  
});
