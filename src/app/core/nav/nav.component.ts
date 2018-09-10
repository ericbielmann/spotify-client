import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

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

  constructor(private filterService: FilterTextService,
    private router: Router) {
  }

  filterChanged(searchText: string) {
    this.filteredList = this.filterService.filter(searchText, ['id', 'name', 'side'], this.list);
    if(searchText.length > 3) {
      this.router.navigate(['dashboard', {searchText: searchText}]);
    }
  }
}