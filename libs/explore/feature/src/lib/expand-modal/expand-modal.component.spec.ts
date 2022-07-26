import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule, ModalController } from '@ionic/angular';
import { API } from '../../../../../shared/api/api.service';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule} from '@angular/router/testing';
import { ExpandModalComponent } from './expand-modal.component';
import { CommonModule } from '@angular/common';
import { NavbarModule } from '@the-au-pair/shared/components/navbar';
import { FormsModule } from '@angular/forms';

describe('ExpandModalComponent', () => {
  let component: ExpandModalComponent;
  let fixture: ComponentFixture<ExpandModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExpandModalComponent],
      imports: [IonicModule, CommonModule,HttpClientTestingModule,NavbarModule, RouterTestingModule, FormsModule,],
      providers: [API,ModalController]
    }).compileComponents();
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
});
