import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AlbumComponent } from './album.component';
import { AlbumRoutingModule } from './album-routing.module';
import { AlbumTrackComponent } from "./album-track/album-track.component";
import { SharedModule } from '../shared/shared.module';
import { SpotifyService } from '../services/spotify.service';

@NgModule({
    imports: [
        CommonModule,
        AlbumRoutingModule,
        SharedModule
    ],
    declarations: [AlbumComponent, AlbumTrackComponent],
    providers: [SpotifyService]
})
export class AlbumModule { }