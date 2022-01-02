import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OwlOptions } from 'ngx-owl-carousel-o';

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
              this.toDataURL(
                this.movie["Poster"],
                function (dataUrl : any) {

                  console.log('deni:' + dataUrl);
                });
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

}
