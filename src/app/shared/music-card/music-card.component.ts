import { Component, Input } from '@angular/core';

@Component({
  selector: 'music-card',
   templateUrl: './music-card.component.html',
   styleUrls: ['./music-card.component.scss']
})
export class MusicCardComponent {

  @Input() image = 'assets/ps-icon.png';

  constructor() {
  }
}