import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../services/spotify.service';
import { Artist } from '../models/artist';
import { Album } from '../models/album';
import { ISubscription } from "rxjs/Subscription";

@Component({
    selector: 'artist',
    templateUrl: './artist.component.html',
    styleUrls: ['./artist.component.scss']
})
export class ArtistComponent implements OnInit, OnDestroy {

    private artist?: Artist;
    private albums?: Album[];
    private artistId: string;
    private subscription: ISubscription[] = [];

    constructor(private route: ActivatedRoute, private spotifyService: SpotifyService) { }

    ngOnInit() {
        this.spotifyService.getToken();
        this.subscription.push(this.route.params
            .subscribe(params => {
                this.artistId = params['id'];
                this.getArtist(this.artistId);
                // this.getArtistAlbums(this.artistId);
            }));
    }

    ngOnDestroy() {
        for (let sub of this.subscription) {
            sub.unsubscribe();
        }
    }

    private getArtist(id: string) {
        this.subscription.push(this.spotifyService.getArtist(id)
            .subscribe((artist: Artist) => {
                this.artist = artist;
            }));
    }

    // private getArtistAlbums(id: string) {
    //     this.spotifyService.getArtistAlbums(id)
    //         .subscribe((albums: any) => {
    //             this.albums = albums.items;
    //         });
    // }

}