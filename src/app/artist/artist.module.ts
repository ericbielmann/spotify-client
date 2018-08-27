import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ArtistComponent } from './artist.component';
import { ArtistRoutingModule } from './artist-routing.module';
import { SpotifyService } from '../services/spotify.service';

@NgModule({
    imports: [
        CommonModule,
        ArtistRoutingModule
    ],
    declarations: [ArtistComponent],
    providers: [SpotifyService]
})
export class ArtistModule { }