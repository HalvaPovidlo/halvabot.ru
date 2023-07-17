import {Component, OnInit} from '@angular/core';
import {MoviesService} from "../../core/services/movies.service";
import {Movie} from "../../core/models/movie.model";

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.less']
})
export class MoviesComponent implements OnInit{
  movies: Movie[] = [];
constructor(
  private readonly moviesService:MoviesService
) {}
  ngOnInit(): void {
    this.moviesService.getAllMovies().subscribe(data => this.movies = data.films);
  }
}
