import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {of, tap} from "rxjs";
import {Router} from "@angular/router";
import {environment} from "../../../environments/environment";
import {catchError} from "rxjs/operators";

@Injectable({providedIn: "root"})
export class JwtService {
  constructor(
    private readonly http: HttpClient,
    private readonly router: Router
  ) {
  }

  getToken(): string {
    return window.localStorage["jwtToken"];
  }

  getRefreshToken(): string {
    return window.localStorage["refreshToken"];
  }

  saveTokens(token: string, refreshToken: string): void {
    window.localStorage["jwtToken"] = token;
    window.localStorage["refreshToken"] = refreshToken;
  }

  saveId(id: number): void {
    window.localStorage["id"] = id;
  }

  clearStorage(): void {
    window.localStorage.removeItem("jwtToken");
    window.localStorage.removeItem('refreshToken');
    window.localStorage.removeItem('id');
  }

  logout() {
    this.clearStorage();
  }

  refreshToken() {
    return this.http
      .post<any>(`${environment.authApiURL}/api/v1/refresh`, null, {
        params: {
          id: window.localStorage['id'],
          refresh: this.getRefreshToken(),
        }
      })
      .pipe(
        tap((user) => {
          // console.log('user:', user);
          this.saveTokens(user.token, user.refresh_token);
          // return of(user);
        }),
        catchError(() => {
          // console.log('Поймал ошибку')
          this.logout();
          return of(false);
        })
      );
  }
}
