import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { NavbarModule } from '@the-au-pair/shared/components/navbar';
import { API } from '../../../../shared/api/api.service';
import { ExploreComponent } from './explore.component';
import { NgxsModule, Store } from '@ngxs/store';
import { AppState } from '../../../../shared/ngxs/state';
import { of } from 'rxjs';
import { SetId } from '../../../../../libs/shared/ngxs/actions';
import { ExpandModalComponent } from './expand-modal/expand-modal.component';

const apiMock = {
  getUser(){
    return of({})
  },
  getAuPair() {
    return of({})
  }
}

describe('ExploreComponent', () => {
  let component: ExploreComponent;
  let fixture: ComponentFixture<ExploreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExploreComponent],
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
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExploreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should,open the modal when called', async ()=>{
    jest.spyOn(component,"openModal");
    component.openModal("dxzv6chgn5zp19ezfiqn7fxf");
    expect(await component.openModal).toReturn();
  });

  it('should, open the menu when called', async ()=>{
    jest.spyOn(component,"openMenu");
    component.openMenu();
    expect(await component.openMenu).toReturn();
  });

  it('should, open a toast when openToast is called', async ()=>{
    jest.spyOn(component,"errToast");
    component.errToast();
    expect(await component.errToast).toReturn();
  });

  it('should, close the menu when closeMenu is called', async ()=>{
    jest.spyOn(component,"closeMenu");
    component.closeMenu();
    expect(await component.closeMenu).toReturn();
  });

  it('should, calculate an average rating of the au pair from their rating array given a valid array', async () =>{
    const expectedRating = 4;
    const average = await component.getAverage([3,5]);
    expect(average).toEqual(expectedRating);
  })
  
  it('should, return zero rating array given an empty array', async () =>{
    const expectedRating = 0;
    const average = await component.getAverage([]);
    expect(average).toEqual(expectedRating);
  })
  
  it('should, return zero rating array given an invalid array', async () =>{
    const expectedRating = 0;
    const average = await component.getAverage([0, -5, 6]);
    expect(average).toEqual(expectedRating);
  })

  it('should, return the age from a given date', async () =>{
    const expectedAge = 18;
    const age = await component.getAge('05/07/2004');
    expect(age).toEqual(expectedAge);
  })

  it('should, return the users details from the api call', async () => {
    jest.spyOn(apiMock, 'getUser').mockImplementation(()=>of(
      {
        id: "0101015077086",
        rating: [1],
        payRate: 0,
        fname: "Test",
        sname: "Test",
        suburb: "Test",
        employer: "",
        registered: "true",
        birth: "05/07/2004",
        gender: "male",
        longitude: 0,
        latitude: 0,
        distance: 0,
      }
    ));
  
    await component.ngOnInit();
  })

  it('should, return the correct au pairs from the payrateFilter', async () => {
    const auPair1: any = {
      id: "0101011234098",
      rating: [1,2,3],
      payRate: 125,
      fname: "Name1",
      sname: "SName1",
      suburb: "Test 1",
      employer: "",
      registered: "true",
      birth: "2015-10-10",
      gender: "male",
      longitude: 0,
      latitude: 0,
      distance: 0,
    }

    const auPair2: any = {
      id: "0101011234099",
      rating: [1,2,3],
      payRate: 200,
      fname: "Name2",
      sname: "SName2",
      suburb: "Test 2",
      employer: "",
      registered: "true",
      birth: "2015-10-10",
      gender: "male",
      longitude: 0,
      latitude: 0,
      distance: 0,
    }

    const auPair3: any = {
      id: "0101011234097",
      rating: [1,2,3],
      payRate: 200,
      fname: "Name3",
      sname: "SName3",
      suburb: "Test 3",
      employer: "",
      registered: "true",
      birth: "2015-10-10",
      gender: "male",
      longitude: 0,
      latitude: 0,
      distance: 0,
    }

    const auPair4: any = {
      id: "0101011234096",
      rating: [1,2,3],
      payRate: 200,
      fname: "Name4",
      sname: "SName4",
      suburb: "Test 4",
      employer: "",
      registered: "true",
      birth: "2015-10-10",
      gender: "male",
      longitude: 0,
      latitude: 0,
      distance: 0,
    }

    const formData = {min_payrate : "100", max_payrate : "150"}

    jest.spyOn(component, "closeMenu");

    component.restoredAuPairArray = [auPair1, auPair2, auPair3, auPair4];

    await component.payRateFilter(formData);

    expect(component.AuPairArray).toEqual([auPair1]);
    expect(component.closeMenu).toHaveBeenCalled();
  })

  it('should, return the correct au pairs from the ageFilter', async () => {
    const auPair1: any = {
      id: "0101011234098",
      rating: [1,2,3],
      payRate: 125,
      fname: "Name1",
      sname: "SName1",
      suburb: "Test 1",
      employer: "",
      registered: "true",
      birth: "2005-10-10",
      gender: "male",
      longitude: 0,
      latitude: 0,
      distance: 0,
    }

    const auPair2: any = {
      id: "0101011234099",
      rating: [1,2,3],
      payRate: 200,
      fname: "Name2",
      sname: "SName2",
      suburb: "Test 2",
      employer: "",
      registered: "true",
      birth: "1900-10-10",
      gender: "male",
      longitude: 0,
      latitude: 0,
      distance: 0,
    }

    const auPair3: any = {
      id: "0101011234097",
      rating: [1,2,3],
      payRate: 200,
      fname: "Name3",
      sname: "SName3",
      suburb: "Test 3",
      employer: "",
      registered: "true",
      birth: "1900-10-10",
      gender: "male",
      longitude: 0,
      latitude: 0,
      distance: 0,
    }

    const auPair4: any = {
      id: "0101011234096",
      rating: [1,2,3],
      payRate: 200,
      fname: "Name4",
      sname: "SName4",
      suburb: "Test 4",
      employer: "",
      registered: "true",
      birth: "1900-10-10",
      gender: "male",
      longitude: 0,
      latitude: 0,
      distance: 0,
    }

    const formData = {min_age : "18"}

    jest.spyOn(component, "closeMenu");

    component.restoredAuPairArray = [auPair1, auPair2, auPair3, auPair4];

    await component.ageFilter(formData);

    expect(component.AuPairArray).toEqual([auPair1]);
    expect(component.closeMenu).toHaveBeenCalled();
  })

  it('should, return the correct au pairs from the distanceFilter', async () => {
    const auPair1: any = {
      id: "0101011234098",
      rating: [1,2,3],
      payRate: 125,
      fname: "Name1",
      sname: "SName1",
      suburb: "Test 1",
      employer: "",
      registered: "true",
      birth: "2005-10-10",
      gender: "male",
      longitude: 0,
      latitude: 0,
      distance: 20,
    }

    const auPair2: any = {
      id: "0101011234099",
      rating: [1,2,3],
      payRate: 200,
      fname: "Name2",
      sname: "SName2",
      suburb: "Test 2",
      employer: "",
      registered: "true",
      birth: "1900-10-10",
      gender: "male",
      longitude: 0,
      latitude: 0,
      distance: 1000,
    }

    const auPair3: any = {
      id: "0101011234097",
      rating: [1,2,3],
      payRate: 200,
      fname: "Name3",
      sname: "SName3",
      suburb: "Test 3",
      employer: "",
      registered: "true",
      birth: "1900-10-10",
      gender: "male",
      longitude: 0,
      latitude: 0,
      distance: 1000,
    }

    const auPair4: any = {
      id: "0101011234096",
      rating: [1,2,3],
      payRate: 200,
      fname: "Name4",
      sname: "SName4",
      suburb: "Test 4",
      employer: "",
      registered: "true",
      birth: "1900-10-10",
      gender: "male",
      longitude: 0,
      latitude: 0,
      distance: 1000,
    }

    const formData = {min_distance : "10", max_distance : "30"}

    jest.spyOn(component, "closeMenu");

    component.restoredAuPairArray = [auPair1, auPair2, auPair3, auPair4];

    await component.distanceFilter(formData);

    expect(component.AuPairArray).toEqual([auPair1]);
    expect(component.closeMenu).toHaveBeenCalled();
  })

  it('should, return the correct au pairs from the gender Filter', async () => {
    const auPair1: any = {
      id: "0101011234098",
      rating: [1,2,3],
      payRate: 125,
      fname: "Name1",
      sname: "SName1",
      suburb: "Test 1",
      employer: "",
      registered: "true",
      birth: "2005-10-10",
      gender: "female",
      longitude: 0,
      latitude: 0,
      distance: 20,
    }

    const auPair2: any = {
      id: "0101011234099",
      rating: [1,2,3],
      payRate: 200,
      fname: "Name2",
      sname: "SName2",
      suburb: "Test 2",
      employer: "",
      registered: "true",
      birth: "1900-10-10",
      gender: "male",
      longitude: 0,
      latitude: 0,
      distance: 1000,
    }

    const auPair3: any = {
      id: "0101011234097",
      rating: [1,2,3],
      payRate: 200,
      fname: "Name3",
      sname: "SName3",
      suburb: "Test 3",
      employer: "",
      registered: "true",
      birth: "1900-10-10",
      gender: "male",
      longitude: 0,
      latitude: 0,
      distance: 1000,
    }

    const auPair4: any = {
      id: "0101011234096",
      rating: [1,2,3],
      payRate: 200,
      fname: "Name4",
      sname: "SName4",
      suburb: "Test 4",
      employer: "",
      registered: "true",
      birth: "1900-10-10",
      gender: "male",
      longitude: 0,
      latitude: 0,
      distance: 1000,
    }

    jest.spyOn(component, "closeMenu");

    component.isOnline = true;

    component.restoredAuPairArray = [auPair1, auPair2, auPair3, auPair4];

    await component.updateDriverOnlineStatus();

    expect(component.AuPairArray).toEqual([auPair1]);
    expect(component.closeMenu).toHaveBeenCalled();
  })

  it('should, return the correct distance from calculateEucDistance', async () => {

    const auPairx = 10;
    const auPairy = 10;

    component.currentParentx = 11;
    component.currentParenty = 11;

    const expectedDistance = 155.9412148011714 ;
    const distance = await component.calculateEucDistance(auPairx, auPairy);
    expect(distance).toEqual(expectedDistance);
  })

  it('should, return the correct au pairs from the gender Filter', async () => {
    const auPair1: any = {
      id: "0101011234098",
      rating: [1,2,3],
      payRate: 125,
      fname: "Name1",
      sname: "SName1",
      suburb: "Test 1",
      employer: "",
      registered: "true",
      birth: "2005-10-10",
      gender: "female",
      longitude: 0,
      latitude: 0,
      distance: 20,
    }

    const auPair2: any = {
      id: "0101011234099",
      rating: [1,2,3],
      payRate: 200,
      fname: "Name2",
      sname: "SName2",
      suburb: "Test 2",
      employer: "",
      registered: "true",
      birth: "1900-10-10",
      gender: "male",
      longitude: 0,
      latitude: 0,
      distance: 1000,
    }

    const auPair3: any = {
      id: "0101011234097",
      rating: [1,2,3],
      payRate: 200,
      fname: "Name3",
      sname: "SName3",
      suburb: "Test 3",
      employer: "",
      registered: "true",
      birth: "1900-10-10",
      gender: "male",
      longitude: 0,
      latitude: 0,
      distance: 1000,
    }

    const auPair4: any = {
      id: "0101011234096",
      rating: [1,2,3],
      payRate: 200,
      fname: "Name4",
      sname: "SName4",
      suburb: "Test 4",
      employer: "",
      registered: "true",
      birth: "1900-10-10",
      gender: "male",
      longitude: 0,
      latitude: 0,
      distance: 1000,
    }

    jest.spyOn(component, "closeMenu");

    component.restoredAuPairArray = [auPair1, auPair2, auPair3, auPair4];

    await component.resetFilters();

    expect(component.AuPairArray).toEqual([auPair1, auPair2, auPair3, auPair4]);
    expect(component.closeMenu).toHaveBeenCalled();
  })
});

describe('ExpandModalComponent', () => {
  let component: ExpandModalComponent;
  let fixture: ComponentFixture<ExpandModalComponent>;
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExpandModalComponent],
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
    fixture = TestBed.createComponent(ExpandModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should,close the modal when closeModal is called', async ()=>{
    jest.spyOn(component,"closeModal");
    component.closeModal();
    expect(await component.closeModal).toReturn();
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
  })
});
