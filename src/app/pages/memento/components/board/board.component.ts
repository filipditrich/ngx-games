import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IMementoCard } from '../../memento.list';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
})
export class BoardComponent implements OnInit {

  @Input() cards: IMementoCard[] = [];
  @Input() settings: any;
  @Output() onCardFlip: EventEmitter<any> = new EventEmitter<any>();

  ngOnInit() {
  }

  cardFlip(card: IMementoCard) {
    this.onCardFlip.emit(card);
  }

}
