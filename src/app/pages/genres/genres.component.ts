import { MoviesService } from './../../services/movies.service';
import { Component, OnInit } from '@angular/core';
import { Genre } from 'src/app/models/genre';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.scss'],
})
export class GenresComponent implements OnInit {
  genres: Genre[] = [];

  constructor(private ms: MoviesService) {}

  ngOnInit(): void {
    this.ms.getMovieGenres().subscribe((genre) => {
      this.genres = genre;
    });
  }
}
