import { Movie } from './../../models/movie';
import { MoviesService } from './../../services/movies.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  movies: any = [];
  popularMovies: Movie[] = [];
  topRateMovies: Movie[] = [];
  upComingMovies: Movie[] = [];

  constructor(private movie: MoviesService) {}

  ngOnInit(): void {
    this.movie.getMovies('popular').subscribe((movies) => {
      this.popularMovies = movies;
      console.log(movies);
    });

    this.movie.getMovies('top_rated').subscribe((movies) => {
      this.topRateMovies = movies;
    });

    this.movie.getMovies('upcoming').subscribe((movies) => {
      this.upComingMovies = movies;
    });
  }
}
