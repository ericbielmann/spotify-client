import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
    { path: 'artist/:id', loadChildren: './artist/artist.module#ArtistModule' },
    { path: 'callback', loadChildren: 'app/callback/callback.module#CallbackModule' },
    {
        path: '',
        redirectTo: '',
        pathMatch: 'full'
      }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }