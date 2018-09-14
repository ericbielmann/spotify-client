import { Component, Input, OnInit } from '@angular/core';

import { Album } from '../../models/album';
import { SpotifyService } from "../../services/spotify.service";
import { AlbumRoutingModule } from '../album-routing.module';

@Component({
    selector: 'album-track',
    templateUrl: './album-track.component.html',
    styleUrls: ['./album-track.component.scss'],
    providers: []
})
export class AlbumTrackComponent implements OnInit {

    @Input() tracks: any[];
    @Input() albumName: string;
    @Input() albumImage: string;

    private favorites = [];

    constructor(private spotifyService: SpotifyService) { }

    ngOnInit() {
        this.favorites = this.spotifyService.getUserFavorites();
        this.checkFavoriteTracks();
    }

    private checkFavoriteTracks() {
        if(this.tracks) {
            for(let item of this.tracks) {
                if(this.favorites.find(x=> x.id === item.id)) {
                    item.isFavourite = true;
                }
            }
        }
    }

    private manageFavourite(track: any): void {
        track.isFavourite = !track.isFavourite;
        if (track.isFavourite) {
            track.albumName = this.albumName;
            track.albumImage = this.albumImage;
            this.spotifyService.addUserFavorite(track);
        }
        else {
            this.spotifyService.removeUserFavorite(track);
        }
    }
}