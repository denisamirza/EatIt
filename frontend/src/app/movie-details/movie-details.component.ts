import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {

  movie: any;
  id: any;
  constructor(private http : HttpClient) { }

  ngOnInit(): void {
    this.id = "tt1285016";
    this.getImDbMovie();
  }

  getImDbMovie() {
    this.http.get('http://localhost:3000/movie/imdb/' + this.id, {
          }).subscribe(data => {
              console.log("success" + JSON.stringify(data));
              this.movie = JSON.parse(JSON.stringify(data));
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
