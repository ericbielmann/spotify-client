import { Component, OnInit, AfterViewInit, AfterViewChecked } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Artist } from "../models/artist";
import { SpotifyService } from "../services/spotify.service";
import { TokenService } from "../core/token.service";

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [SpotifyService]
})
export class DashboardComponent implements OnInit, AfterViewInit, AfterViewChecked {

  private userInfo: any;
  private artistRes: Artist[];
  private defaultImage = 'assets/default-image.png';
  private favorites = [];
  private searchText = '';

  constructor(private route: ActivatedRoute,
    private spotifyService: SpotifyService,
    private tokenService: TokenService,
    private cdRef: ChangeDetectorRef) {
  }

  ngOnInit() {
    if (this.userInfo === undefined) {
      this.spotifyService.getUserInfo()
        .subscribe((data: any) => {
          this.userInfo = data;
        });
    }

    this.searchText = this.route.snapshot.paramMap.get('searchText');
    if (this.searchText) {
      this.filterChanged(this.searchText);
    }
  }

  ngAfterViewInit() {
    this.favorites = this.spotifyService.getUserFavorites();
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  filterChanged(event) {
    this.spotifyService.searchMusic(event).subscribe((data: any) => {
      this.artistRes = data.artists.items;
    });
  }

  login() {
    this.tokenService.login();
  }

  //add ondestroy
}
