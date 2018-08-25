import { Component } from '@angular/core';

import { TokenService } from './core/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'spotify-client';

  constructor(private tokenService: TokenService) {
  }
}
