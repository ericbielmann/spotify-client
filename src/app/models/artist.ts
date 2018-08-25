export class Artist {
    external_urls: {
        spotify: string;
    };
    followers: {
        href: string;
        total: number;
    };
    genres: string[];
    href: string;
    id: string;
    images: object[];
    name: string;
    popularity: number;
    type: string;
    uri: string;
}