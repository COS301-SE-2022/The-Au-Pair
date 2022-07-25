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
        NgxsModule.forRoot()
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
});
