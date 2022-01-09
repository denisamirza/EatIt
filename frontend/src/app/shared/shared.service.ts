import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  movieId: any;
  username: any;
  constructor() { }

  setMovieId(movieId: any) {
    this.movieId = movieId;
  }

  getMovieId() {
    return this.movieId;
  }

  setUsername(username: any) {
    this.username = username;
  }

  getUsername() {
    return this.username;
  }
}
