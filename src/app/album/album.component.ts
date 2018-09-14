import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../services/spotify.service';
import { Album } from '../models/album';
import { ISubscription } from "rxjs/Subscription";

@Component({
    selector: 'app-album',
    templateUrl: './album.component.html',
    styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit, OnDestroy {

    album?: Album;
    // private favorites = [];
    private subscription: ISubscription[] = [];

    constructor(private route: ActivatedRoute, private spotifyService: SpotifyService) { }

    ngOnInit() {
        this.spotifyService.getToken();
        this.subscription.push(this.route.params
            .subscribe(params => {
                const id = params['id'];
                this.getAlbum(id);
            }));
        // this.favorites = this.spotifyService.getUserFavorites();
    }

    ngOnDestroy() {
        for (let sub of this.subscription) {
            sub.unsubscribe();
        }
      }

    private getAlbum(id: string) {
        this.subscription.push(this.spotifyService.getAlbum(id)
            .subscribe((album: any) => {
                this.album = album;

                // if(this.album.tracks.items) {
                //     for(let item of this.album.tracks.items) {
                //         if(this.favorites.find(x=> x.id === item.id)) {
                //             item.isFavourite = true;
                //         }
                //     }
                // }
            }));
    }

    // private manageFavourite(track: any): void {
    //     track.isFavourite = !track.isFavourite;
    //     if (track.isFavourite) {
    //         track.albumName = this.album.name;
    //         track.albumImage = this.album.images[0].url;
    //         this.spotifyService.addUserFavorite(track);
    //     }
    //     else {
    //         this.spotifyService.removeUserFavorite(track);
    //     }
    // }
}