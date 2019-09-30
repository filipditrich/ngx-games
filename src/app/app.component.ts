import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="modal-container" id="modal-container"></div>
    <router-outlet></router-outlet>
  `,
})
export class AppComponent {}
