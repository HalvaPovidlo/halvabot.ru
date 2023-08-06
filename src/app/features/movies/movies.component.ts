import {Component, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {map} from "rxjs/operators";
import {ModalService} from "../../core/services/modal.service";
import {FormControl, FormGroup} from "@angular/forms";
import {MoviesService} from "../../core/services/movies.service";

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.less']
})
export class MoviesComponent implements OnInit, OnDestroy, OnChanges {
  movies$: Observable<any>;
  anime$: Observable<any>
  destroy$ = new Subject<void>();
  currentIndex = 2;

  movieFormGroup = new FormGroup({
    kinopoisk: new FormControl(''),
    score: new FormControl('')
  })

  constructor(
    private readonly moviesService: MoviesService,
    // private readonly userService: UserService,
    // private readonly router: Router,
    protected modalService: ModalService
  ) {
  }

  // log() {
  //   console.log(this.movieFormGroup.value);
  // }

  handleSubmit() {
    const kinopoisk = this.movieFormGroup.get('kinopoisk')?.value;
    const score = this.movieFormGroup.get('score')?.value;
    console.log(kinopoisk, score);
    this.moviesService.postNewMovie(+(kinopoisk as string | number), +(score as string))
      .subscribe()
    // this.router.navigate([`/movies/${kinopoisk}`])
  }

  closeModal() {
    this.modalService.close();
    const kinopoisk = this.movieFormGroup.get('kinopoisk')?.value;
  }

  setScore(score: string) {
    this.movieFormGroup.get('score')?.setValue(score)
  }

  // incCurrentIndex() {
  //   this.currentIndex += 1;
  // }
  //
  // decCurrentIndex() {
  //   this.currentIndex -= 1;
  // }

  ngOnChanges(): void {
    console.log(this.modalService['modals']);
  }

  ngOnInit(): void {
    // console.log(this.modalService['modals']);
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
