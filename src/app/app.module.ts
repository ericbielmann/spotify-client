import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

/* Feature Modules */
// import { ArtistModule } from "./artist/artist.module";
import { CoreModule } from './core/core.module';
import { DashboardModule } from "./dashboard/dashboard.module";
import { CallbackModule } from "./callback/callback.module";

/* Routing Module */
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    // ArtistModule,
    CoreModule,
    CallbackModule,
    DashboardModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
