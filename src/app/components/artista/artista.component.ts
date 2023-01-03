import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
  styleUrls: ['./artista.component.css']
})
export class ArtistaComponent {

  artista: any;
  imgArt: any;
  nameArt: string;
  urlArt: string;
  loading: boolean;
  topTracks: any[] = [];
 
  constructor(private _router: ActivatedRoute, private _spotify: SpotifyService) {
    this._router.params.subscribe(params => {
      this.getArtist(params['id']);
      this.getTopTracks(params['id']);
    })
  }
 
  getArtist(id: string) {
    this.loading = true;
    this._spotify.getArtist(id)
      .subscribe(artista => {
        this.loading = false;
        this.imgArt = artista['images'];
        this.nameArt = artista['name'];
        this.urlArt = artista['external_urls'].spotify;
        console.log(artista)
      })
  }

  getTopTracks(id:string) {
    this._spotify.getTopTracks(id)
      .subscribe(topTracks => {
        console.log(topTracks);
        this.topTracks = topTracks;
      })
  }
}





  


