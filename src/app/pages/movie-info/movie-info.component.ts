import { MovieImages, MovieVideo, MovieCredits } from './../../models/movie';
import { IMAGES_SIZES } from './../../constants/image-sizes';
import { Movie } from 'src/app/models/movie';
import { MoviesService } from './../../services/movies.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-movie-info',
  templateUrl: './movie-info.component.html',
  styleUrls: ['./movie-info.component.scss'],
})
export class MovieInfoComponent implements OnInit, OnDestroy {
  movieData: Movie | null = null;
  movieVideos: MovieVideo[] = [];
  movieImages: MovieImages | null = null;
  movieCredits: MovieCredits | null = null;
  imageSize = IMAGES_SIZES;
  constructor(
    private route: ActivatedRoute,
    private ms: MoviesService,
    public ro: Router
  ) {}

  ngOnInit(): void {
    this.route.params.pipe(first()).subscribe(({ id }) => {
      this.getMovie(id);
      this.getMovieVideos(id);
      this.getMovieImages(id);
      this.getMovieCredits(id);
    });
  }

  getMovie(id: string) {
    this.ms.getMovie(id).subscribe((movie) => {
      this.movieData = movie;
      console.log(this.movieData);
    });
  }

  getMovieVideos(id: string) {
    this.ms.getMovieVideos(id).subscribe((movie) => {
      this.movieVideos = movie;
      console.log(this.movieVideos);
    });
  }

  getMovieImages(id: string) {
    this.ms.getMovieImages(id).subscribe((img) => {
      this.movieImages = img;
    });
  }

  getMovieCredits(id: string) {
    this.ms.getMovieCredits(id).subscribe((credits) => {
      this.movieCredits = credits;
    });
  }

  ngOnDestroy(): void {
    console.log('component destroyed');
  }
}
