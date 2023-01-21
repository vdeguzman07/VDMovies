import { ActivatedRoute } from '@angular/router';
import { MoviesService } from './../../services/movies.service';
import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/movie';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit {
  movies: Movie[] = [];
  genreId: string | null = null;
  searchValue: string = '';

  constructor(private movie: MoviesService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.pipe(take(1)).subscribe(({ genreId }) => {
      if (genreId) {
        this.genreId = genreId;
        this.getMoviesByGenre(genreId, 1);
      } else this.getPagedMovies(1);
    });
  }

  getPagedMovies(page: number, search?: string) {
    this.movie.searchMovies(page, search).subscribe((movies) => {
      this.movies = movies;
    });
  }

  paginate(event: any) {
    console.log(event);
    const pageNumber = event.page + 1;
    if (this.genreId) {
      this.getMoviesByGenre(this.genreId, pageNumber);
    } else {
      if (this.searchValue) this.getPagedMovies(pageNumber, this.searchValue);
      else this.getPagedMovies(pageNumber);
    }
  }

  getMoviesByGenre(genreId: string, page: number) {
    this.movie.getMoviesByGenre(genreId, page).subscribe((movie) => {
      this.movies = movie;
    });
  }

  searchChanged() {
    if (this.searchValue) this.getPagedMovies(1, this.searchValue);
  }
}
