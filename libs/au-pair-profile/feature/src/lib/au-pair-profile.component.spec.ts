import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuPairProfileComponent } from './au-pair-profile.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { NavbarModule } from '@the-au-pair/shared/components/navbar';
import { RouterTestingModule} from '@angular/router/testing';
import { API } from '../../../../shared/api/api.service';
import { By } from '@angular/platform-browser';

describe('AuPairProfileComponent', () => {
  let component: AuPairProfileComponent;
  let fixture: ComponentFixture<AuPairProfileComponent>;

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
        RouterTestingModule
       ],
       providers:[API]
    }).compileComponents();
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
  
});
