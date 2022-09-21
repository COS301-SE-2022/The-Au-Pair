import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { AppComponent } from './app.component';
import { API } from '../../../../libs/shared/api/api.service';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { NavbarModule } from '@the-au-pair/shared/components/navbar';
import { RouterTestingModule} from '@angular/router/testing';
import { NgxsModule } from '@ngxs/store';
import { AppState } from '../../../../libs/shared/ngxs/state';
import { Router } from '@angular/router';

describe('AppComponent', () => {
  let component: AppComponent;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [FormsModule,
        IonicModule,
        HttpClientTestingModule,
        NavbarModule,
        RouterTestingModule,
        NgxsModule.forRoot([AppState])
       ],
       providers:[API, Geolocation],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  })
  );

  beforeEach(() => {
    const fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
  // TODO: add more tests!

  //test when user type is 0 that router navigates to admin-console
  it('should navigate to admin-console when user type is 0', () => {
    const router = TestBed.inject(Router);
    const spy = jest.spyOn(router, 'navigate');
    component.dash(0);
    expect(spy).toHaveBeenCalledWith(['/admin-console']);
  });

});
