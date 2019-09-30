import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { shuffle } from '../../helpers/shuffle.helper';
import { IMementoCard } from './memento.list';
import { MementoService } from './memento.service';
import { ModalComponent } from '../components/modal/modal.component';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-memento',
  templateUrl: './memento.component.html',
})
export class MementoComponent implements OnInit {

  public prepared: IMementoCard[] = [];
  public flipped: IMementoCard[] = [];
  public found: IMementoCard[] = [];
  public timeSpent = 0;
  public flips = 0;
  public timer;
  public settings = {
    max: 2,
  };

  constructor(private mementoService: MementoService,
              private modalService: NgbModal,
              private router: Router,
              private title: Title) {}

  ngOnInit() {
    this.title.setTitle('ngx-games » MEMENTO');
    this.init();
  }

  /**
   * @description Initializes the game
   */
  init() {

    setTimeout(() => {
      const modal = this.modalService.open(ModalComponent);

      modal.componentInstance.modalHeader = 'Memento 1.0';
      modal.componentInstance.modalContent = `<p>Please choose a difficulty of the game:<br><br><b class="text-success">EASY:</b> 5 pairs<br><b class="text-warning">MEDIUM:</b> 10 pairs<br><b class="text-danger">HARD:</b> 20 pairs<br><b class="text-danger">EXTREME:</b> 50 pairs</p>`;
      modal.componentInstance.modalButtons = [
        {
          text: 'Testing',
          classes: 'btn-secondary',
          action: () => modal.close(2),
        },
        {
          text: 'Extreme',
          classes: 'btn-danger',
          action: () => modal.close(50),
        },
        {
          text: 'Hard',
          classes: 'btn-danger',
          action: () => modal.close(20),
        },
        {
          text: 'Medium',
          classes: 'btn-warning',
          action: () => modal.close(10),
        },
        {
          text: 'Easy',
          classes: 'btn-success',
          action: () => modal.close(5),
        },
      ];

      modal.result.then(max => {
        // set the difficulty
        this.settings.max = max;

        // restart all values
        this.flipped = [];
        this.timeSpent = 0;
        this.found = [];
        this.flips = 0;

        // get cards
        const input = this.mementoService.getJSONList();
        const prepared: IMementoCard[] = [];
        input.splice(input.length - this.settings.max).forEach(item => {
          const img = Object.assign({}, item), text = Object.assign({}, item);
          img['type'] = 'img'; text['type'] = 'text';
          prepared.push(img);
          prepared.push(text);
        });
        this.prepared = shuffle(prepared);
      });
    }, 100); // hot-fix
  }

  /**
   * @description Handler for onFlip event
   * @param {IMementoCard} card
   */
  cardFlip(card: IMementoCard) {
    // update stats
    if (this.flips === 0) { this.timeWatcher(true); }
    if (this.flipped.indexOf(card) < 0) { this.flips += 1; }

    // flip
    let filteredFlipped = this.flipped.filter(x => this.found.indexOf(x) === -1);
    if (filteredFlipped.length <= 2) {
      card.flipped = true;
      this.flipped.push(card);
    }

    // re-filter
    filteredFlipped = this.flipped.filter(x => this.found.indexOf(x) === -1);
    if (filteredFlipped.length === 2) {
      setTimeout(() => {
        if (filteredFlipped[0].id === card.id && filteredFlipped[0].type !== card.type) {
          // pair match
          this.found.push(filteredFlipped[0]);
          this.found.push(card);
          this.prepared.filter(x => x.id === card.id).forEach(y => y.found = true);
          if (this.found.length === this.prepared.length) {
            // all found
            this.timeWatcher(false);
            const modal = this.modalService.open(ModalComponent);

            modal.componentInstance.modalHeader = 'All Done!';
            modal.componentInstance.modalContent = `<p>Congratulations!<br>You have finished the game in just <b>${this.timeSpent} seconds</b> using ${this.flips / 2} attempts (${this.flips} flips).</p>`;
            modal.componentInstance.modalButtons = [
              {
                text: 'Home',
                classes: 'btn-secondary',
                action: () => {
                  this.router.navigate(['/']).then(() => {
                    modal.close();
                  });
                }
              },
              {
                text: 'Play again',
                classes: 'btn-primary',
                action: () => {
                  this.init();
                  modal.close();
                },
              },
            ];
          }
        } else {
          // flip back
          this.prepared.filter(x => this.found.indexOf(x) < 0).forEach(item => {
            item.flipped = false;
          });
          this.flipped = [];
        }
      }, 1000);
    }
  }

  /**
   * @description Counts user-spent time after first click (flip)
   */
  timeWatcher(action: boolean = true) {
    // start the timer
    if (action && this.flips === 0) {
      this.timer = setInterval(() => {
        this.timeSpent += 1;
      }, 1000);
    }
    // stop the timer
    if (!action) {
      clearInterval(this.timer);
    }
  }

}
