import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";


@Injectable({providedIn: "root"})
export class MoviesService {

  constructor(
    private readonly http: HttpClient,
  ) {
  }

  getAllMovies(): Observable<any> {
    return this.http
      .get<any>('http://178.154.221.12:9091/api/v1/public/films/all')
  }

  getMovieById(id: number): Observable<any> {
    return this.http
      .get<any>(`http://178.154.221.12:9091/api/v1/public/films/${id}/get`)
  }

  score(id: number, score: number): Observable<any> {
    return this.http
      .patch<any>(`http://178.154.221.12:9091/api/v1/films/${id}/score`, {score: score})
  }
}

