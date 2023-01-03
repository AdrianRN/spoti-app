import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  artists:any[] = [];
  loading:boolean;

  constructor(private _spotify:SpotifyService) {


  }

  buscar(term:string) {
    console.log(term);

    this._spotify.getArtists(term)
      .subscribe((data:any) => {
        this.artists = data;
        // console.log(this.artists);
        // console.log(data.artists.items);
      })
  }

  

}
