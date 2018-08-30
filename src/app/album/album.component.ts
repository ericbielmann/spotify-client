import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../services/spotify.service';
import { Album } from '../models/album';

@Component({
    selector: 'app-album',
    templateUrl: './album.component.html',
    styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {

    album?: Album;

    constructor(private route: ActivatedRoute, private spotifyService: SpotifyService) { }

    ngOnInit() {
        this.spotifyService.getToken();
        this.route.params
            .subscribe(params => {
                const id = params['id'];
                this.getAlbum(id);
            });
    }

    private getAlbum(id: string) {
        this.spotifyService.getAlbum(id)
            .subscribe((album: any) => {
                this.album = album;
            });
    }
}