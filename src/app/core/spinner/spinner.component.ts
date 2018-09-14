import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { SpinnerState, SpinnerService } from './spinner.service';

@Component({
  selector: 'spo-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnDestroy, OnInit {
  show = false;

  private subscription: Subscription;

  constructor(
    private spinnerService: SpinnerService
  ) { }

  ngOnInit() {
    this.subscription = this.spinnerService.spinnerState
      .subscribe((state: SpinnerState) => {
        this.show = state.show;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}