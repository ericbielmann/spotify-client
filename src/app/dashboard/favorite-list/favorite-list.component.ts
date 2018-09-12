import { Component, OnInit } from '@angular/core';

import { SpotifyService } from "../../services/spotify.service";

@Component({
  selector: 'favorite-list',
  templateUrl: './favorite-list.component.html',
  styleUrls: ['./favorite-list.component.scss'],
  providers: []
})
export class FavoriteListComponent implements OnInit {

    private favorites = [];

    constructor(private spotifyService: SpotifyService) {}

    ngOnInit(){
        this.favorites = this.spotifyService.getUserFavorites();
    }
}