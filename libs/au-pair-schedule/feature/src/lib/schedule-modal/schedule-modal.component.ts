import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { API } from '../../../../../shared/api/api.service';


@Component({
  selector: 'the-au-pair-schedule-modal',
  templateUrl: './schedule-modal.component.html',
  styleUrls: ['./schedule-modal.component.scss'],
})
export class ScheduleModalComponent {
  constructor(private serv: API,private modalCtrl : ModalController) {}

  closeModal(){
    this.modalCtrl.dismiss();
  }
}
