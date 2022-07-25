import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ParentDashboardComponent } from './parent-dashboard';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { NavbarModule } from '@the-au-pair/shared/components/navbar';
import { RouterTestingModule} from '@angular/router/testing';
import { API } from '../../../../shared/api/api.service';
import { By } from '@angular/platform-browser';
import { NgxsModule } from '@ngxs/store';
import { AppState } from 'libs/shared/ngxs/state';

describe('ParentProfileComponent', () => {
  let component: ParentDashboardComponent;
  let fixture: ComponentFixture<ParentDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ParentDashboardComponent],
    }).compileComponents();
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ParentDashboardComponent],
      imports: [FormsModule,
        IonicModule,
        HttpClientTestingModule,
        NavbarModule,
        RouterTestingModule,
        NgxsModule.forRoot([AppState])
       ],
       providers:[API, ModalController]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentDashboardComponent);
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

  it('should, have a redirect to the add activity page', () => {
    const href = fixture.debugElement.query(By.css('#addAct')).nativeElement
    .getAttribute('routerLink');
    expect(href).toEqual('/add-activity'); 
  });

  it('should, have a redirect to the schedule page', () => {
    const href = fixture.debugElement.query(By.css('#schedule')).nativeElement
    .getAttribute('routerLink');
    expect(href).toEqual('/schedule'); 
  });

  it('should, have a redirect to the children dashboard page', () => {
    const href = fixture.debugElement.query(By.css('#childDash')).nativeElement
    .getAttribute('routerLink');
    expect(href).toEqual('/children-dashboard'); 
  });

  it('should, have a redirect to the au-pair cost page', () => {
    const href = fixture.debugElement.query(By.css('#auPairCost')).nativeElement
    .getAttribute('routerLink');
    expect(href).toEqual('/au-pair-cost'); 
  });
});
