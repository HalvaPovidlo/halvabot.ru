import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Observable, Subject} from "rxjs";
import {Movie} from "../../core/models/movie.model";
import {MoviesService} from "../../core/services/movies.service";
import {UserService} from "../../core/services/user.service";
import {User} from "../../core/models/user.model";

@Component({
  selector: 'app-movie-page',
  templateUrl: './movie-page.component.html',
  styleUrls: ['./movie-page.component.less']
})
export class MoviePageComponent implements OnInit, OnDestroy {
  movie$: Observable<Movie>;
  movieId: number;
  users$: Observable<User[]>
  destroy$ = new Subject<void>();

  constructor(
    private readonly route: ActivatedRoute,
    private readonly moviesService: MoviesService,
    private readonly userService: UserService
  ) {
  }

  score(score: number) {
    this.moviesService
      .score(score, this.movieId)
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.movie$ = this.moviesService.getMovieById(id);
    this.users$ = this.userService.getAllUsers();
    this.users$.subscribe(x => console.log(x));
    this.movie$.subscribe(x => {
      console.log(x)
      this.movieId = x.id
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
