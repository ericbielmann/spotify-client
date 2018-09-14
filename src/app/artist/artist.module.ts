import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ArtistAlbumComponent } from "./artist-album/artist-album.component";
import { ArtistComponent } from './artist.component';
import { ArtistRoutingModule } from './artist-routing.module';
import { SharedModule } from '../shared/shared.module';
import { SpotifyService } from '../services/spotify.service';


@NgModule({
    imports: [
        CommonModule,
        ArtistRoutingModule,
        SharedModule
    ],
    declarations: [ArtistAlbumComponent, ArtistComponent],
    providers: [SpotifyService]
})
export class ArtistModule { }