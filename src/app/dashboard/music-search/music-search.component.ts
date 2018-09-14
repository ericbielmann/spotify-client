import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { ISubscription } from "rxjs/Subscription";

import { Artist } from "../../models/artist";
import { SpotifyService } from "../../services/spotify.service";

@Component({
    selector: 'music-search',
    templateUrl: './music-search.component.html',
    styleUrls: ['./music-search.component.scss'],
    providers: []
})
export class MusicSearchComponent implements OnInit, OnDestroy {

    private searchText: string;
    private artistRes: Artist[];
    private defaultImage = 'assets/default-image.png';
    private subscription: ISubscription[] = [];

    @Output() searchChanged: EventEmitter<string> = new EventEmitter<string>();
    @Input()
    public set text(text: string) {
        this.searchText = text;
        if (this.searchText && this.searchText.length > 0) {
            this.filterChanged(this.searchText);
        } else {
            this.artistRes = [];
        }
    }

    constructor(private spotifyService: SpotifyService) { }

    ngOnInit() {
        this.artistRes = [];
        // this.searchText = this.route.snapshot.paramMap.get('searchText');
        // if (this.searchText) {
        //     this.searchChanged.emit(this.searchText);
        //     this.filterChanged(this.searchText);
        // }
    }

    ngOnDestroy() {
        for (let sub of this.subscription) {
            sub.unsubscribe();
        }
    }

    filterChanged(text) {
        this.subscription.push(this.spotifyService.searchMusic(text).subscribe((data: any) => {
            this.artistRes = data.artists.items;
        }));
    }
}