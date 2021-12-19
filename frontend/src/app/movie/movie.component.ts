import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {

  movie: any;
  constructor(private http : HttpClient) { }

  ngOnInit(): void {
    this.getImDbMovies();
  }

  getImDbMovies() {
    this.http.get('http://localhost:3000/movie/imdb', {
          }).subscribe(data => {
            console.log("success" + JSON.stringify(data));
              this.movie = JSON.parse(JSON.stringify(data));
              this.movie = this.movie["Search"];
          })
  }

}
