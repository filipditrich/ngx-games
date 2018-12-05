import { Component, OnInit } from '@angular/core';
import { CardComponent } from '../card.component';

@Component({
  selector: 'app-card-text',
  templateUrl: '../card.component.html',
})
export class CardTextComponent extends CardComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
    this.frontCardContent = `<span>${this.item.title}</span>`;
  }

}
