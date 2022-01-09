import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SharedService } from "../shared/shared.service"

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {

  movie: any;
  movieId: any;
  comment: any;
  username: any;
  commentsList: any;
  constructor(private http : HttpClient,
              private shared: SharedService) { }

  ngOnInit(): void {
    this.movieId = this.shared.getMovieId();
    if ( this.movieId == undefined) {
      this.movieId = localStorage.getItem("movieId");
      console.log("hereee")
    }
    else {
      localStorage.setItem("movieId", this.movieId);
    }
    this.username = "deni";
    this.getImDbMovie();
    this.getCommentsOfMovie();
  }

  getImDbMovie() {
    this.http.get('http://localhost:3000/movie/imdb/' + this.movieId, {
          }).subscribe(data => {
              // console.log("success" + JSON.stringify(data));
              this.movie = JSON.parse(JSON.stringify(data));
              this.toDataURL(
                this.movie["Poster"],
                function (dataUrl : any) {
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

  onSubmit() {
    this.http.post('http://localhost:3000/movieComment/addComment', {
        username: this.username,
        movieId: this.movieId,
        comment: this.comment
      }).subscribe(data => {
        var json = `\"username\":\"${this.username}\",\"comment\":\"${this.comment}\"`;
        this.commentsList.push(json);
        console.log("success");
      })
  }

  getCommentsOfMovie() {
    console.log("lal");
    this.http.get('http://localhost:3000/movieComment/' + this.movieId, {
    }).subscribe(data => {
      this.commentsList = data;
      console.log("success" +  JSON.stringify(this.commentsList[0]));
    })
  }

}
