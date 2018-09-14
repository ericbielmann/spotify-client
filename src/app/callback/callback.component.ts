import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from '../core/token.service';
import { ISubscription } from "rxjs/Subscription";

@Component({
  selector: 'callback',
  templateUrl: './callback.component.html'
})
export class CallbackComponent implements OnInit, OnDestroy {

  logged = false;
  private subscription: ISubscription[] = [];

  constructor(private route: ActivatedRoute, private tokenService: TokenService, private router: Router) { }

  ngOnInit() {
    this.subscription.push(this.route.queryParams.subscribe(params => {
      const code = params['code'];
      this.tokenService.saveCode(code);
      if (code.length) {
        this.logged = true;
        setTimeout(() => { this.router.navigate(['/dashboard']); }, 1000);
      }
    }));
  }

  ngOnDestroy() {
    for (let sub of this.subscription) {
      sub.unsubscribe();
    }
  }
}