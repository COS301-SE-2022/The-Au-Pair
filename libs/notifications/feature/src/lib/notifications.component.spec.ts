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
  let api : API;

  const notifResponse : any = {
    auPairId: "0110135054098",
    body: "Michael's cricket has started",
    date: "2022-07-26",
    id: "62e285f376110f2e6acad693",
    parentId: "0108125215084",
    time: "13:30",
    title: "Cricket match",
  }

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

  describe('ngOnInit', () => {
    it('should call setUserData', () => {
      jest.spyOn(component, 'setUserData');
      component.ngOnInit();
      expect(component.setUserData).toHaveBeenCalled();
    });

    it('should not call getParentNotifications if auPair logged in', () => {
      const spy = jest.spyOn(component, 'setUserData');
      spy.mockImplementation(() => {
        component.userType = 2; 
      });
      jest.spyOn(component, 'getParentNotifications');
      component.ngOnInit();
      expect(component.getParentNotifications).not.toHaveBeenCalled();
    });

    it('should not call getAuPairNotifications if Parent logged in', () => {
      const spy = jest.spyOn(component, 'setUserData');
      spy.mockImplementation(() => {
        component.userType = 1; 
      });
      jest.spyOn(component, 'getAuPairNotifications');
      component.ngOnInit();
      expect(component.getAuPairNotifications).not.toHaveBeenCalled();
    });

    it('should call getParentNotifications if parent logged in', () => {
      const spy = jest.spyOn(component, 'setUserData');
      spy.mockImplementation(() => {
        component.userType = 2; 
      });
      jest.spyOn(component, 'getAuPairNotifications');
      component.ngOnInit();
      expect(component.getAuPairNotifications).toHaveBeenCalled();
    });

    it('should call getParentNotifications if parent logged in', () => {
      const spy = jest.spyOn(component, 'setUserData');
      spy.mockImplementation(() => {
        component.userType = 1; 
      });
      jest.spyOn(component, 'getParentNotifications');
      component.ngOnInit();
      expect(component.getParentNotifications).toHaveBeenCalled();
    });
  });

  jest.mock('http');
  describe('getAuPairNotifications', () => {
    api.getNotificationsByAuPairId = jest.fn();
    
  });
  
});
