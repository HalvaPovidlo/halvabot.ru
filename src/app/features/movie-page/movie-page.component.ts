import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Observable, share, Subject, tap} from "rxjs";
import {Movie} from "../../core/models/movie.model";
import {MoviesService} from "../../core/services/movies.service";
import {UserService} from "../../core/services/user.service";
import {User} from "../../core/models/user.model";
import {distinctUntilChanged} from "rxjs/operators";

@Component({
  selector: 'app-movie-page',
  templateUrl: './movie-page.component.html',
  styleUrls: ['./movie-page.component.less']
})
export class MoviePageComponent implements OnInit, OnDestroy {
  movie$: Observable<Movie>;
  movie: Movie;
  movieId: number;
  users$: Observable<User[]>
  destroy$ = new Subject<void>();
  currentUserScore: number;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly moviesService: MoviesService,
    private readonly userService: UserService,
    private readonly router: Router,
  ) {
  }

  score(score: number) {
    this.currentUserScore = score;
    this.userService.isAuthenticated
      ? this.moviesService.score(this.movieId, score)
        .pipe(distinctUntilChanged())
        .subscribe(() => {
          this.movie$ = this.moviesService.getMovieById(this.movieId).pipe(
            tap(x => console.log(x)),
            share(),
          )
        })
      : this.router.navigate(['login'])
  }

  ngOnInit(): void {
    this.movieId = this.route.snapshot.params['id'];
    this.movie$ = this.moviesService.getMovieById(this.movieId).pipe(
      share()
    );
    this.movie$.subscribe((x) => {
      this.movie = x;
      this.currentUserScore = x.scores[window.localStorage['id']]
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
