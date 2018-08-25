import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from '../core/token.service';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html'
})
export class CallbackComponent implements OnInit {

  logged = false;

  constructor(private route: ActivatedRoute, private tokenService: TokenService, private router: Router) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const code = params['code'];
      this.tokenService.saveCode(code);
      if (code.length) {
        this.logged = true;
        setTimeout(() => { this.router.navigate(['/dashboard']); }, 1000);
      }
    });
  }
}