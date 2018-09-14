import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { ISubscription } from "rxjs/Subscription";

import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from "../services/spotify.service";
import { TokenService } from "../core/token.service";

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: []
})
export class DashboardComponent implements OnInit, OnDestroy {

  private userInfo: any;
  private searchText = '';
  private showFavorites = true;
  private subscription: ISubscription[] = [];

  constructor(private spotifyService: SpotifyService,
    private tokenService: TokenService,
    private cdRef: ChangeDetectorRef,
    private route: ActivatedRoute) {
    // this.spotifyService.login().subscribe(data=> console.log(data));
  }

  ngOnInit() {
    if (this.userInfo === undefined) {
      this.subscription.push(this.spotifyService.getUserInfo()
        .subscribe((data: any) => {
          this.userInfo = data;
        }));
    }

    this.filterChanged(this.route.snapshot.paramMap.get('searchText'));
  }

  ngOnDestroy() {
    for (let sub of this.subscription) {
      sub.unsubscribe();
    }
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
