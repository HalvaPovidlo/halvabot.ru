import {Component, OnDestroy, OnInit} from '@angular/core';
import {MoviesService} from "../../core/services/movies.service";
import {Observable, Subject} from "rxjs";
import {UserService} from "../../core/services/user.service";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.less']
})
export class MoviesComponent implements OnInit, OnDestroy {
  movies$: Observable<any>;
  anime$: Observable<any>
  destroy$ = new Subject<void>();
  currentIndex = 2;

  constructor(
    private readonly moviesService: MoviesService,
    private readonly userService: UserService
  ) {
  }

  incCurrentIndex() {
    this.currentIndex += 1;
  }

  decCurrentIndex() {
    this.currentIndex -= 1;
  }

  ngOnInit(): void {
    // this.userService.authenticate();
    this.movies$ = this.moviesService.getAllMovies();
    this.movies$.pipe(
      map(movie => movie.filter((movie: any) => movie.genres.includes('аниме')))
    ).subscribe(x => console.log('Всего 27 аниме smh', x));
    // this.movies$.subscribe(x => console.log(x));
    // this.anime$ = this.movies$.map();
    // this.anime$.subscribe(x => console.log(x))
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
