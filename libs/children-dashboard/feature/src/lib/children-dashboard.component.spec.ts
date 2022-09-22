import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ChildrenDashboardComponent } from './children-dashboard.component';
import { API } from '../../../../shared/api/api.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import { NavbarModule } from '@the-au-pair/shared/components/navbar';
import { RouterTestingModule} from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { NgxsModule } from '@ngxs/store';
import { AppState } from '../../../../shared/ngxs/state';
import { Child } from '../../../../shared/interfaces/interfaces';

describe('ChildrenDashboardComponent', () => {
  let component: ChildrenDashboardComponent;

  let fixture: ComponentFixture<ChildrenDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChildrenDashboardComponent],
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
    fixture = TestBed.createComponent(ChildrenDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should, have a redirect to the add-child', () => {
    const href = fixture.debugElement.query(By.css('#addChild')).nativeElement
    .getAttribute('routerLink');
    expect(href).toEqual('/add-child'); 
  });

  //Checking the number of children is less than 4
  it('should return true when checking the number of children', ()=>{
    const expectedValue: Child = {
      id: "0101011234098",
      fname: "name",
      sname: "surname",
      dob: "2022-10-10",
      allergies: "none",
      diet: "none",
      parent: "",
      aupair: ''
    };

    component.children = [expectedValue];  

    expect(component.checkNumChildren()).toEqual(true);
  });


  //Checking that a toast is displayed if there are the max number of children
  it('should not display a toast message when there are 4 children registered', ()=>{
    const child1: Child = {
      id: "0101011234098",
      fname: "name",
      sname: "surname",
      dob: "2015-10-10",
      allergies: "none",
      diet: "none",
      parent: "",
      aupair: ''
    };

    const child2: Child = {
      id: "0101011234099",
      fname: "name",
      sname: "surname",
      dob: "2015-10-10",
      allergies: "none",
      diet: "none",
      parent: "",
      aupair: ''
    };

    const child3: Child = {
      id: "0101011234100",
      fname: "name",
      sname: "surname",
      dob: "2015-10-10",
      allergies: "none",
      diet: "none",
      parent: "",
      aupair: ''
    };

    const child4: Child = {
      id: "0101011234101",
      fname: "name",
      sname: "surname",
      dob: "2015-10-10",
      allergies: "none",
      diet: "none",
      parent: "",
      aupair: ''
    };

    jest.spyOn(component, "openToast");

    component.children = [child1,child2,child3,child4];  

    component.checkNumChildren();

    expect(component.openToast).toHaveBeenCalled();
  });

  //Checking that the correct functions are called when removing a child
  it('should call the removeChildFromParent function when removing a child', ()=>{
    const fakeChild: Child = {
      id: "1111111111111",
      fname: "name",
      sname: "surname",
      dob: "2022-10-10",
      allergies: "none",
      diet: "none",
      parent: "",
      aupair: ''
    };

    jest.spyOn(component, "removeChildFromParent");

    component.removeChild(fakeChild);  

    expect(component.removeChildFromParent).toHaveBeenCalled();
  });
});
