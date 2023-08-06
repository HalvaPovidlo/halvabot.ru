import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {environment} from "../../../environments/environment";


@Injectable({providedIn: "root"})
export class MoviesService {

  constructor(
    private readonly http: HttpClient,
  ) {
  }

  getAllMovies(): Observable<any> {
    return this.http
      .get<any>(`${environment.filmsApiURL}/api/v1/public/films/all`)
      .pipe(
        map(obj => obj?.films)
      )
  }

  getMovieById(id: number): Observable<any> {
    const token = window.localStorage.getItem('jwtToken');
    const url = token && token !== 'undefined'
      ? `${environment.filmsApiURL}/api/v1/films/${id}/get`
      : `${environment.filmsApiURL}/api/v1/public/films/${id}/get`
    return this.http.get<any>(url)
  }

  score(id: number, score: number): Observable<any> {
    console.log(score);
    return this.http
      .patch<any>(`${environment.filmsApiURL}/api/v1/films/${id}/score`,
        null,
        {params: {score: score}})
  }

  postNewMovie(kinopoisk: string | number, score: number): Observable<any> {
    return this.http
      .post<any>(`${environment.filmsApiURL}/api/v1/films/new`, null, {
        params: {
          url: kinopoisk,
          score: score
        }
      })
  }
}

