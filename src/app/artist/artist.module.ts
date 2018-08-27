import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ArtistComponent } from './artist.component';
import { ArtistRoutingModule } from './artist-routing.module';
import { TokenService } from '../core/token.service';

@NgModule({
    imports: [
        CommonModule,
        ArtistRoutingModule
    ],
    declarations: [ArtistComponent],
    providers: [TokenService]
})
export class ArtistModule { }