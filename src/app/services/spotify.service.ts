import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { TokenService } from '../core/token.service';

@Injectable()
export class SpotifyService {
    private searchUrl: string;
    private artistUrl: string;
    private albumsUrl: string;
    private albumUrl: string;

    client_id = '44352ea60e344eb4b595ffa032e1325f';
    client_secret = '2097f12fa0344ab1b95b25a230c671ae';

    private accessToken: any;
    private tokenType: string;

    constructor(private http: Http, private tokenService: TokenService) {
        this.getToken();
    }

    getUserInfo() {
        const headers = new Headers();
        headers.append(`Authorization`, `Bearer ${this.accessToken}`);
        return this.http
            .get('https://api.spotify.com/v1/me', { headers })
            .map(data => data.json());
    }

    getToken() {
        this.accessToken = this.tokenService.returnToken();
    }

    login() {
        
        let authorizationTokenUrl = `https://accounts.spotify.com/api/token`;
        // let authorizationTokenUrl = `/api/token`;

        let header = new Headers();
        header.append('Authorization', 'Basic  ' + btoa(this.client_id + ':' + this.client_secret));
        header.append('Content-Type', 'application/x-www-form-urlencoded;');

        let options = new RequestOptions({ headers: header });
        let body = 'grant_type=client_credentials';



        return this.http.post(authorizationTokenUrl, body, options)
            .map(data => data.json())
            .do(token => {
                this.accessToken = token.access_token;
                this.tokenType = token.token_type;
            }, error => console.log(error));
    }

    // searchMusic(str: string, type = 'artist') {
    //     let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'aa' });
    //     let options = new RequestOptions({ headers: headers });
    //     this.searchUrl = 'https://api.spotify.com/v1/search?query=' + str + '&offset=0&limit=20&type=' + type + '&market=US';
    //     return this.http.get(this.searchUrl, options)
    //         .map(res => res.json());
    // }

    searchMusic(str: string, type = 'artist') {
        const options = this.getOptions();
        this.searchUrl = 'https://api.spotify.com/v1/search?query=' + str + '&offset=0&limit=20&type=' + type + '&market=US';
        // return this.http.get(this.searchUrl, options)
        //     .map(res => res.json());

        const headers = new Headers();
        headers.append(`Authorization`, `Bearer ${this.tokenService.returnToken()}`);
        return this.http
            .get(this.searchUrl, { headers })
            .map(data => data.json());
    }

    getArtist(id: string) {
        this.artistUrl = 'https://api.spotify.com/v1/artists/' + id;
        return this.http.get(this.artistUrl)
            .map(res => res.json());
    }

    getAlbums(artistId: string) {
        this.albumsUrl = 'https://api.spotify.com/v1/artists/' + artistId + '/albums';
        return this.http.get(this.albumsUrl)
            .map(res => res.json());
    }

    getAlbum(id: string) {
        this.albumUrl = 'https://api.spotify.com/v1/albums/' + id;
        return this.http.get(this.albumUrl)
            .map(res => res.json());
    }

    private getOptions() {
        console.log(this.accessToken);
        console.log(this.tokenType);

        let header = new Headers();
        header.append('Authorization', this.tokenType + ' ' + this.accessToken);
        let options = new RequestOptions({ headers: header });

        return options;
    }
}