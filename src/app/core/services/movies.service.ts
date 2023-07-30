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
    return this.http
      .get<any>(`${environment.filmsApiURL}/api/v1/public/films/${id}/get`)
  }

  score(id: number, score: number): Observable<any> {
    return this.http
      .patch<any>(`${environment.filmsApiURL}/api/v1/films/${id}/score`, {score: score})
  }
}

