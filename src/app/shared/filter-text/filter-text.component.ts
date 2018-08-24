import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'filter-text',
   templateUrl: './filter-text.component.html',
   styleUrls: ['./filter-text.component.scss']
})
export class FilterTextComponent {
  @Output() changed: EventEmitter<string>;
  @Input() placeholder: string;

  filter: string;

  constructor() {
    this.changed = new EventEmitter<string>();
  }

  clear() {
    this.filter = '';
  }

  filterChanged(event: any) {
    event.preventDefault();
    console.log(`Filter Changed: ${this.filter}`);
    this.changed.emit(this.filter);
  }
}