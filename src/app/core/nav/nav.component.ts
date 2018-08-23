import { Component, OnInit } from '@angular/core';

// import { MessageService, ModalService } from '../core.module';
// import { FilterTextComponent } from '../../shared/filter-text/filter-text.component';
import { FilterTextService } from '../../shared/filter-text/filter-text.service';

@Component({
  selector: 'spo-nav',
   templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {

  list = [];
  filteredList = [];

  ngOnInit() {
  }

  constructor(private filterService: FilterTextService
    /*private messageService: MessageService,
  private modalService: ModalService*/) {
  }

  filterChanged(searchText: string) {
    this.filteredList = this.filterService.filter(searchText, ['id', 'name', 'side'], this.list);
  }
}