import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IMementoCard } from '../../memento.list';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
})
export class CardComponent implements OnInit {

  @Input() settings;
  @Input() item: IMementoCard;
  @Input() flipped: boolean;
  @Input() found: boolean;
  @Output() flip: EventEmitter<any> = new EventEmitter();
  public frontCardContent = '';
  public backCardContent = `<img src="https://www.binteractive.cz////files/3576_size2.jpg" alt="logo pslib.cz">`;

  constructor() { }

  ngOnInit() {
  }

  flipCard(card) {
    this.flip.emit(card);
  }

}
