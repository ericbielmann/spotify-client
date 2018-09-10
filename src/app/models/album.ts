import { Artist } from './artist';

export class Album {
    album_type: string;
    artists: Artist[];
    available_markets: string[];
    external_urls: {
        spotify: string;
    };
    href: string;
    id: string;
    images: any[];
    name: string;
    type: string;
    uri: string;
    tracks: {
        items: any[]
    };
}