import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { SharedService } from "../shared/shared.service"

@Component({
  selector: 'app-favourite-movies',
  templateUrl: './favourite-movies.component.html',
  styleUrls: ['./favourite-movies.component.scss']
})
export class FavouriteMoviesComponent implements OnInit {

  username: any;
  favouriteMovies: any = [];

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 3
      },
      400: {
        items: 3
      },
      740: {
        items: 8
      },
      940: {
        items: 10
      }
    },
    nav: true
  }
  constructor(private http : HttpClient,
              private router: Router,
              private shared: SharedService) { }

  ngOnInit(): void {
    this.username = this.shared.getUsername();
    if (this.username == undefined) {
      this.username = localStorage.getItem("username");
      console.log("hereee")
    }
    else {
      localStorage.setItem("username", this.username);
    }
    console.log("username: " + this.username)
    this.getFavouriteMovies()
  }

  getFavouriteMovies() {
    this.http.get('http://localhost:3000/userFavourites/' + this.username, {
    }).subscribe(data => {
      //this.favouriteMovies = data;
      console.log(JSON.stringify(data));
      let movie = JSON.parse(JSON.stringify(data));
      for (let json of movie) {
        console.log(json.movieId);
        this.getImDbMovieAfterId(json.movieId)
      }
     // console.log("success" +  JSON.stringify(this.favouriteMovies[0]));
    })
  }

  getImDbMovieAfterId(movieId: any) {
    this.http.get('http://localhost:3000/movie/imdb/' + movieId, {
          }).subscribe(data => {
              console.log("success" + JSON.stringify(data));
              var movie = JSON.parse(JSON.stringify(data));
              this.toDataURL(
                movie["Poster"],
                function (dataUrl : any) {
                });
              this.favouriteMovies.push(movie);
          })
  }

  toDataURL(url : any, callback : any) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      var reader = new FileReader();
      reader.onloadend = function () {
        callback(reader.result);
      };
      reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
  }

  gotToMovie(movieId: any) {
    this.shared.setMovieId(movieId);
    this.router.navigate([`movie`]);
  }

  deleteFromFavourites(movieId: any) {
    console.log(movieId)
    const headers = { 'username': this.username, 'movieId': movieId };
    this.http.delete('http://localhost:3000/userFavourites/delete', { headers })
        .subscribe(() => console.log("deleted"));
        this.favouriteMovies = this.favouriteMovies.filter((item: any) => item.imdbID != movieId);
  }

}
