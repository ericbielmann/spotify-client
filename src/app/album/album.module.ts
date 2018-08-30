import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AlbumComponent } from './album.component';
import { AlbumRoutingModule } from './album-routing.module';
import { SpotifyService } from '../services/spotify.service';

@NgModule({
    imports: [
        CommonModule,
        AlbumRoutingModule
    ],
    declarations: [AlbumComponent],
    providers: [SpotifyService]
})
export class AlbumModule { }