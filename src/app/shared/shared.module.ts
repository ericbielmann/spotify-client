import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FilterTextModule } from './filter-text/filter-text.module'
import { MusicCardComponent } from "./music-card/music-card.component";

@NgModule({
  imports: [CommonModule, FilterTextModule, FormsModule],
  declarations: [/*ToastComponent*/MusicCardComponent],
  exports: [CommonModule, FilterTextModule, FormsModule, MusicCardComponent/*, ToastComponent*/],
})
export class SharedModule { }