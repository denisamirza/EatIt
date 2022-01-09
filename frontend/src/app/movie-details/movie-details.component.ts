import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
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
              private router: Router,
              private shared: SharedService) { }

  ngOnInit(): void {
    this.movieId = this.shared.getMovieId();
    if (this.movieId == undefined) {
      this.movieId = localStorage.getItem("movieId");
      console.log("hereee")
    }
    else {
      localStorage.setItem("movieId", this.movieId);
    }
    this.username = this.shared.getUsername();
    if (this.username == undefined) {
      this.username = localStorage.getItem("username");
      console.log("hereee")
    }
    else {
      localStorage.setItem("username", this.username);
    }
    console.log("username: " + this.username)
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
        this.ngOnInit()
        console.log("success");
      })
  }

  getCommentsOfMovie() {
    this.http.get('http://localhost:3000/movieComment/' + this.movieId, {
    }).subscribe(data => {
      this.commentsList = data;
      console.log("success" +  JSON.stringify(this.commentsList[0]));
    })
  }

  addToFavourites() {
    this.http.post('http://localhost:3000/userFavourites/addUserFavouriteMovie', {
      username: this.username,
      movieId: this.movieId,
    }).subscribe(data => {
      console.log("success");
    })
  }

  deleteComment(id: any) {
    console.log(id)
    const headers = { 'id': id };
    this.http.delete('http://localhost:3000/movieComment/delete', { headers })
        .subscribe(() => {
          console.log("deleted");
          this.commentsList = this.commentsList.filter((item: any) => item._id != id);
        })
  }

}
