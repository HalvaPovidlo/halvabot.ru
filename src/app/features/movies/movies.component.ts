import {Component, OnDestroy, OnInit} from '@angular/core';
import {MoviesService} from "../../core/services/movies.service";
import {Observable, Subject} from "rxjs";

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.less']
})
export class MoviesComponent implements OnInit, OnDestroy {
  movies$: Observable<any>;
  destroy$ = new Subject<void>();

  constructor(
    private readonly moviesService: MoviesService
  ) {
  }

  ngOnInit(): void {
    this.movies$ = this.moviesService.getAllMovies();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
