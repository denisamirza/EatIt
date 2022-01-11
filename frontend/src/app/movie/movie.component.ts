import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Router } from '@angular/router';
import { SharedService } from "../shared/shared.service"

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {
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
        items: 4
      },
      400: {
        items: 4
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
  movie: any = [];
  constructor(private http : HttpClient,
              private router: Router,
              private shared: SharedService) { }

  ngOnInit(): void {
    this.getImDbMovies("batman");
    this.getImDbMovies("sting");
    this.getImDbMovies("inception");
  }

  getImDbMovies(movieName: any) {
    this.http.get('http://localhost:3000/movie/'+movieName, {
          }).subscribe(data => {
            console.log("success" + JSON.stringify(data));
              this.movie[movieName] = JSON.parse(JSON.stringify(data));
              this.movie[movieName] = this.movie[movieName]["Search"];
              this.toDataURL(
                this.movie[movieName]["Poster"],
                function (dataUrl : any) {

                  console.log('deni:' + dataUrl);
                });
          })
  }

  gotToMovie(movieId: any) {
    this.shared.setMovieId(movieId);
    this.router.navigate([`movie`]);
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

}
