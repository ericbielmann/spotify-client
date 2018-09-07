import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
// import { catchError } from "rxjs/internal/operators";
import { catchError, finalize } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { TokenService } from '../core/token.service';
import { SpinnerService } from '../core/spinner/spinner.service'

import { Artist } from "../models/artist";
import { Album } from "../models/album";

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

    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };

    constructor(private http: HttpClient,
        private tokenService: TokenService,
        private spinnerService: SpinnerService) {
        this.getToken();
    }

    getUserInfo() {
        // const headers = new Headers();
        // headers.append(`Authorization`, `Bearer ${this.accessToken}`);
        // return this.http
        //     .get('https://api.spotify.com/v1/me', { headers })
        //     .map(data => data.json());

        return this.http
            .get('https://api.spotify.com/v1/me')
            .pipe(
                catchError(this.handleError)
            );
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



        // return this.http.post(authorizationTokenUrl, body)
        //     .map(data => data.json())
        //     .do(token => {
        //         this.accessToken = token.access_token;
        //         this.tokenType = token.token_type;
        //     }, error => console.log(error));

        return this.http.post(authorizationTokenUrl, body, this.httpOptions)
            .do((token: any) => {
                this.accessToken = token.access_token;
                this.tokenType = token.token_type;
            })
            .pipe(
                catchError(this.handleError)
            );
    }

    searchMusic(str: string, type = 'artist') {
        const options = this.getOptions();
        this.spinnerService.show();
        this.searchUrl = 'https://api.spotify.com/v1/search?query=' + str + '&offset=0&limit=20&type=' + type + '&market=US';

        return this.http
            .get(this.searchUrl)
            .pipe(
                catchError(this.handleError),
                finalize(()=> this.spinnerService.hide())
              );
    }

    getArtist(id: string) {
        this.spinnerService.show();
        this.artistUrl = 'https://api.spotify.com/v1/artists/' + id;
        // const headers = new Headers();
        // headers.append(`Authorization`, `Bearer ${this.tokenService.returnToken()}`);
        // return this.http.get(this.artistUrl, { headers })
        //     .map(res => res.json());


        return this.http.get<Artist>(this.artistUrl)
            .pipe(
                catchError(this.handleError),
                finalize(()=> this.spinnerService.hide())
            );
    }

    getArtistAlbums(artistId: string) {
        this.spinnerService.show();
        this.albumsUrl = `https://api.spotify.com/v1/artists/${artistId}/albums`;
        return this.http.get(this.albumsUrl)
            .pipe(
                catchError(this.handleError),
                finalize(()=> this.spinnerService.hide())
            );
    }

    // getAlbum(id: string) {
    //     this.albumUrl = 'https://api.spotify.com/v1/albums/' + id;
    //     return this.http.get(this.albumUrl)
    //         .map(res => res.json());
    // }

    getAlbum(id: string) {
        this.spinnerService.show();
        return this.http
            .get(`https://api.spotify.com/v1/albums/${id}`)
            .pipe(
                catchError(this.handleError)
            );
    }

    private getOptions() {
        console.log(this.accessToken);
        console.log(this.tokenType);

        let header = new Headers();
        header.append('Authorization', this.tokenType + ' ' + this.accessToken);
        let options = new RequestOptions({ headers: header });

        return options;
    }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);
        }
        // return an observable with a user-facing error message
        return throwError(
            'Something bad happened; please try again later.');
    };
}