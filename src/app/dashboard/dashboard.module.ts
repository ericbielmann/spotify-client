import { NgModule }           from '@angular/core';
import { SharedModule }       from '../shared/shared.module';

import { DashboardComponent }     from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { FavoriteListComponent } from "./favorite-list/favorite-list.component";
import { MusicSearchComponent } from "./music-search/music-search.component";

import { SpotifyService } from "../services/spotify.service";

@NgModule({
  imports: [
    SharedModule,
    DashboardRoutingModule
  ],
  declarations: [ DashboardComponent, FavoriteListComponent, MusicSearchComponent ],
  providers:    [ SpotifyService ]
})
export class DashboardModule { }