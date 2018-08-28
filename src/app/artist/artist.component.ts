import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../services/spotify.service';
import { Artist } from '../models/artist';
import { Album } from '../models/album';

@Component({
    selector: 'artist',
    templateUrl: './artist.component.html',
    styleUrls: ['./artist.component.scss']
})
export class ArtistComponent implements OnInit {

    private artist?: Artist;
    private albums?: Album[];

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
            .subscribe((artist: Artist) => {
                this.artist = artist;
            });
    }

    private getArtistAlbums(id: string) {
        this.spotifyService.getArtistAlbums(id)
            .subscribe((albums: any) => {
                this.albums = albums.items;
            });
    }

}