import { Component, Input, OnInit } from '@angular/core';

import { Album } from '../../models/album';
import { AlbumRoutingModule } from '../album-routing.module';
import { SpotifyService } from "../../services/spotify.service";
import { ToastService } from '../../core/toast.service';

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

    constructor(private spotifyService: SpotifyService,
        private toastService: ToastService) { }

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
            this.toastService.success('Track added.')
        }
        else {
            this.spotifyService.removeUserFavorite(track);
            this.toastService.success('Track removed.')
        }
    }
}