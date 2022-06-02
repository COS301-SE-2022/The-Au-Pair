import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'the-au-pair-schedule-modal',
  templateUrl: './schedule-modal.component.html',
  styleUrls: ['./schedule-modal.component.scss'],
})
export class ScheduleModalComponent {
  constructor(private modalCtrl : ModalController) {}

  closeModal(){
    this.modalCtrl.dismiss();
  }
}
