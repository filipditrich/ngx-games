import { Component, OnInit } from '@angular/core';
import { CardComponent } from '../card.component';

@Component({
  selector: 'app-card-image',
  templateUrl: '../card.component.html',
})
export class CardImageComponent extends CardComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
    this.frontCardContent = `<img src="${this.item.src}" alt="${this.item.title}">`;
  }

}
