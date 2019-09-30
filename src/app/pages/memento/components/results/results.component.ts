import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
})
export class ResultsComponent implements OnInit {

  @Input() timeSpent;
  @Input() flips;
  @Input() found;
  @Input() total;

  constructor() { }

  ngOnInit() {
  }

}
