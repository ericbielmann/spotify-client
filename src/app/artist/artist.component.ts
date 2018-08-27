import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../services/spotify.service';
import { Artist } from '../models/artist';
import { Album } from '../models/album';

@Component({
    selector: 'app-artist',
    templateUrl: './artist.component.html',
    styleUrls: ['./artist.component.scss']
})
export class ArtistComponent implements OnInit {

    artist?: Artist;
    albums?: Album[];

    constructor(private route: ActivatedRoute, private spotifyService: SpotifyService) { }

    ngOnInit() {
        this.spotifyService.getToken();
        this.route.params
            .subscribe(params => {
                const id = params['id'];
                this.getArtist(id);
                this.getArtistAlbums(id);
            });
    }

    private getArtist(id: string) {
        this.spotifyService.getArtist(id)
            .subscribe(artist => {
                this.artist = artist;
            });
    }

    private getArtistAlbums(id: string) {
        // this.spotifyService.getArtistAlbums(id)
        //     .subscribe(albums => {
        //         this.albums = albums.items;
        //     });
    }

}