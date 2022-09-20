import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { NavbarModule } from '@the-au-pair/shared/components/navbar';
import { RouterTestingModule} from '@angular/router/testing';
import { API } from '../../../../shared/api/api.service';
import { NgxsModule, Store } from '@ngxs/store';
import { AppState } from '../../../../shared/ngxs/state';
import { JobSummaryParentViewComponent } from './job-summary-parent-view.component';
import { CommonModule } from '@angular/common';
import { of } from 'rxjs';
import { SetId } from 'libs/shared/ngxs/actions';
import { Router } from '@angular/router';
import { ExploreFeatureModule } from '@the-au-pair/explore/feature';

const apiMock = {
  getUser(){
    return of({})
  },
  getParent() {
    return of({})
  },
  getChildren() {
    return of({})
  },
  getContractbyIDs()
  {
    return of({})
  }
}

describe('JobSummaryParentViewComponent', () => {
  let component: JobSummaryParentViewComponent;
  let fixture: ComponentFixture<JobSummaryParentViewComponent>;
  let store: Store;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JobSummaryParentViewComponent],
      imports: [IonicModule, CommonModule,HttpClientTestingModule,NavbarModule, RouterTestingModule.withRoutes([
        {path: 'explore', component: ExploreFeatureModule}
      ]), FormsModule, NgxsModule.forRoot([AppState])],
      providers:[
        {
          provide:API, useValue:apiMock
        }
      ]
    }).compileComponents();

    store = TestBed.inject(Store);
    router = TestBed.inject(Router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobSummaryParentViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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

  it('should,return an integer representation of Monday',async () => {
    const expected = 0;
    jest.spyOn(component, "getCurDay").mockReturnValue(0);
    const dayInt = await component.getCurDay(["Monday"]);
    expect(dayInt).toEqual(expected);
  })

  it('should,return an integer representation of Tuesday',async () => {
    const expected = 1;
    jest.spyOn(component, "getCurDay").mockReturnValue(1);
    const dayInt = await component.getCurDay(["Tuesday"]);
    expect(dayInt).toEqual(expected);
  })

  it('should,return an integer representation of Wednesday',async () => {
    const expected = 2;
    jest.spyOn(component, "getCurDay").mockReturnValue(2);
    const dayInt = await component.getCurDay(["Wednesday"]);
    expect(dayInt).toEqual(expected);
  })

  it('should,return an integer representation of Thursday',async () => {
    const expected = 3;
    jest.spyOn(component, "getCurDay").mockReturnValue(3);
    const dayInt = await component.getCurDay(["Thursday"]);
    expect(dayInt).toEqual(expected);
  })

  it('should,return an integer representation of Friday',async () => {
    const expected = 4;
    jest.spyOn(component, "getCurDay").mockReturnValue(4);
    const dayInt = await component.getCurDay(["Friday"]);
    expect(dayInt).toEqual(expected);
  })

  it('should,return an integer representation of Saturday',async () => {
    const expected = 5;
    jest.spyOn(component, "getCurDay").mockReturnValue(5);
    const dayInt = await component.getCurDay(["Saturday"]);
    expect(dayInt).toEqual(expected);
  })

  it('should,return an integer representation of Sunday',async () => {
    const expected = 6;
    jest.spyOn(component, "getCurDay").mockReturnValue(6);
    const dayInt = await component.getCurDay(["Sunday"]);
    expect(dayInt).toEqual(expected);
  })

  it("should, show a error toast if the contract already exists",async () => {
    const toastSpy = jest.spyOn(component, 'createToast');

    jest.spyOn(apiMock, 'getContractbyIDs').mockImplementation(()=>of(
      {
        "id" : "1010101012973"
      }
    ));

    await component.sendHireRequests();
    expect(toastSpy).toBeCalledWith('You have already requested to hire this Au Pair.');
  })

  it('should, redirect to the explore page after sendiing requests', async () => {
    const navigateSpy = jest.spyOn(router, 'navigate');

    await component.sendHireRequests();
    expect(navigateSpy).toHaveBeenCalledWith(['/explore']);
  });
  
});
