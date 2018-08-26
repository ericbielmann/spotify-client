import { Component, OnInit } from '@angular/core';

import { Artist } from "../models/artist";
import { SpotifyService } from "../services/spotify.service";
import { TokenService } from "../core/token.service";

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [SpotifyService]
})
export class DashboardComponent implements OnInit {

  private userInfo: any;
  private artistRes: Artist[];
  private defaultImage = 'assets/default-image.png';

  constructor(private spotifyService: SpotifyService, private tokenService: TokenService) {
    // this.spotifyService.login().subscribe(data=> console.log(data));

    if (this.userInfo === undefined) {
      this.spotifyService.getUserInfo()
        .subscribe(res => {
          this.userInfo = res;
        });
    }
  }

  ngOnInit() {
    this.spotifyService.getToken();
  }

  filterChanged(event) {
    this.spotifyService.searchMusic(event).subscribe(data => {
      this.artistRes = data.artists.items;
    });
  }

  login() {
    this.tokenService.login();
  }
}
