import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  newSongs:any[] = [];
  loading:boolean;
  errorMessage:any;

  constructor(private _spotify:SpotifyService) {

    this.loading = true;

    // Settimeout just to see the loading animation
    setTimeout(() => {
      
      this._spotify.getNewReleases()
        .subscribe((data:any) => {
          // console.log(data.albums.items);
  
          this.newSongs = data;
          this.loading = false;
          
          
        }, (error:any) => {
          this.errorMessage = error.error.error.message;
          console.log(this.errorMessage);
        });
    }, 250);
   }
}
