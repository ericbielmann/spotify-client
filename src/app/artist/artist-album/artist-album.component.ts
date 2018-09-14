import { Component, Input, OnInit, OnDestroy } from '@angular/core';

import { Album } from '../../models/album';
import { SpotifyService } from "../../services/spotify.service";
import { ISubscription } from "rxjs/Subscription";

@Component({
    selector: 'artist-album',
    templateUrl: './artist-album.component.html',
    styleUrls: ['./artist-album.component.scss'],
    providers: []
})
export class ArtistAlbumComponent implements OnInit, OnDestroy {

    @Input() artistId: string;

    private albums?: Album[];
    private subscription: ISubscription[] = [];

    constructor(private spotifyService: SpotifyService) { }

    ngOnInit() {
        this.getArtistAlbums(this.artistId);
    }

    ngOnDestroy() {
        for (let sub of this.subscription) {
            sub.unsubscribe();
        }
    }

    private getArtistAlbums(id: string) {
        this.subscription.push(this.spotifyService.getArtistAlbums(id)
            .subscribe((albums: any) => {
                this.albums = albums.items;
            }));
    }
}