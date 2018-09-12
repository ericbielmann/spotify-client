import { Component, OnInit, AfterViewInit, AfterViewChecked } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from "../services/spotify.service";
import { TokenService } from "../core/token.service";

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: []
})
export class DashboardComponent implements OnInit, AfterViewInit, AfterViewChecked {

  private userInfo: any;
  private searchText = '';
  private showFavorites = true;

  constructor(private spotifyService: SpotifyService,
    private tokenService: TokenService,
    private cdRef: ChangeDetectorRef,
    private route: ActivatedRoute) {
    // this.spotifyService.login().subscribe(data=> console.log(data));
  }

  ngOnInit() {
    if (this.userInfo === undefined) {
      this.spotifyService.getUserInfo()
        .subscribe((data: any) => {
          this.userInfo = data;
        });
    }

    this.filterChanged(this.route.snapshot.paramMap.get('searchText'));
  }

  ngAfterViewInit() {
    // this.favorites = this.spotifyService.getUserFavorites();
  }

  ngAfterViewChecked() {
    // this.cdRef.detectChanges();
  }

  login() {
    this.tokenService.login();
  }

  filterChanged(event) {
    this.searchText = event;
    this.showFavorites = !this.searchText;
  }

  refreshSearch(event) {
    // this.searchText = event;
    // this.showFavorites = !this.searchText;
  }

  //add ondestroy
}
