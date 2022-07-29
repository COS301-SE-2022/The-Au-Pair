import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule} from '@angular/router/testing';
import { InputFieldModule } from '@the-au-pair/shared/components/input-field';
import { PasswordFieldModule } from '@the-au-pair/shared/components/password-field';
import { LocationFieldModule } from '@the-au-pair/shared/components/location-field';
import { LongFieldModule } from '@the-au-pair/shared/components/long-field';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RegisterComponent } from './register.component';
import { API } from '../../../../shared/api/api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastController } from '@ionic/angular';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  //Valid form
  // const populatedForm = { name: "Test", surname: "van Tester", email: "test@test.com", phone: "1234567890", id: "0101011234098", medAid: "1234", address: "123 Test Road", pass: "TesterPass321!", confPass: "TesterPass321!" };

  // //Inalid form
  // const invalidName = { name: "Test1", surname: "van Tester", email: "test@test.com", phone: "1234567890", id: "0101011234098", medAid: "1234", address: "123 Test Road", pass: "TesterPass321!", confPass: "TesterPass321!" };
  // const invalidSurname = { name: "Test", surname: "van Tester*", email: "test@test.com", phone: "1234567890", id: "0101011234098", medAid: "1234", address: "123 Test Road", pass: "TesterPass321!", confPass: "TesterPass321!" };
  // const invalidEmail = { name: "Test", surname: "van Tester", email: "test@@test.com", phone: "1234567890", id: "0101011234098", medAid: "1234", address: "123 Test Road", pass: "TesterPass321!", confPass: "TesterPass321!" };
  // const invalidPhone = { name: "Test", surname: "van Tester", email: "test@test.com", phone: "1234567890a", id: "0101011234098", medAid: "1234", address: "123 Test Road", pass: "TesterPass321!", confPass: "TesterPass321!" };
  // const invalidId = { name: "Test", surname: "van Tester", email: "test@test.com", phone: "1234567890", id: "99999911234098", medAid: "1234", address: "123 Test Road", pass: "TesterPass321!", confPass: "TesterPass321!" };
  // const invalidMedAid = { name: "Test", surname: "van Tester", email: "test@test.com", phone: "1234567890", id: "0101011234098", medAid: "1234!", address: "123 Test Road", pass: "TesterPass321!", confPass: "TesterPass321!" };
  // const invalidPass = { name: "Test", surname: "van Tester", email: "test@test.com", phone: "1234567890", id: "0101011234098", medAid: "1234", address: "123 Test Road", pass: "TesterPass", confPass: "TesterPass321!" };
  // const invalidConfPass = { name: "Test", surname: "van Tester", email: "test@test.com", phone: "1234567890", id: "0101011234098", medAid: "1234", address: "123 Test Road", pass: "TesterPass321!", confPass: "TesterPass321!@" };


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [
        IonicModule,
        InputFieldModule,
        LocationFieldModule,
        PasswordFieldModule,
        LongFieldModule,
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientTestingModule,
      ],
      providers:[API, ToastController],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
