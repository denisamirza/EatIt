import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  movieId: any;
  constructor() { }

  setMovieId(movieId: any) {
    this.movieId = movieId;
  }

  getMovieId() {
    return this.movieId;
  }
}
