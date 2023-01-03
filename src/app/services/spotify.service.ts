import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  token: string;

  constructor(private _http:HttpClient) {
    this.getToken()
        .subscribe((data:any) => {
          this.token = `${data.token_type} ${data.access_token}`
          // console.log(this.token);
          
          // console.log(data);
        });
  }

  getToken() {
    const url = 'https://accounts.spotify.com/api/token';
    const headers = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
    };
    const body = new HttpParams()
      .set('grant_type', 'client_credentials')
      .set('client_id', '9c0286c15c834e3e8512680793b0500c')
      .set('client_secret', '8e512034f4d04269adcb9abd2e14ea5e');
   
    return this._http.post(url, body.toString(), headers);
   
  }

  getQuery(query:string) {
    const url = `https://api.spotify.com/v1/${query}`;

    const headers = new HttpHeaders({
      'Authorization': this.token,  
    });

    return this._http.get(url, {headers});
  }

  getNewReleases() {

    return this.getQuery('browse/new-releases')
      .pipe(map((data:any) => data['albums'].items));
    
  }

  getArtists(term:string) {
    return this.getQuery(`search?query=${term}&type=artist&locale=en-US%2Cen%3Bq%3D0.7&offset=0&limit=20`)
      .pipe(map((data:any) => data.artists.items));
  }

  getArtist(id:string) {
    return this.getQuery(`artists/${id}`);
      // .pipe(map((data:any) => data.artists.items));
  }

  getTopTracks(id:string) {
    return this.getQuery(`artists/${id}/top-tracks?country=us`)
      .pipe(map((data:any) => data.tracks));
  }
  




}
