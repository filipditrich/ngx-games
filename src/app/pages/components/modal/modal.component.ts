import {Component, Input} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  template: `
    <div class="modal-header">
      <span>{{ modalHeader }}</span>
    </div>
    <div class="modal-body" [innerHTML]="modalContent"></div>
    <div class="modal-footer flex-wrap">
      <button *ngFor="let button of modalButtons"
              class="btn btn-md {{button.classes}} my-1"
              (click)="button.action()">
        {{button.text}}
      </button>
    </div>
  `,
})
export class ModalComponent {

  @Input() modalHeader: string;
  @Input() modalContent: string;
  @Input() modalButtons = [];

  constructor(private activeModal: NgbActiveModal) { }

  closeModal() {
    this.activeModal.close('closed from cross');
  }
}
