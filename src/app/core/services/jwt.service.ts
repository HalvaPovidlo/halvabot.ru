import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {of, tap} from "rxjs";
import {catchError} from "rxjs/operators";
import {Router} from "@angular/router";

@Injectable({providedIn: "root"})
export class JwtService {
  url = 'http://178.154.221.12:9090';

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
      .post<any>(`${this.url}/api/v1/refresh`, null, {
        params: {
          id: 123,
          refresh: this.getRefreshToken(),
        }
      })
      .pipe(
        tap((tokens) => {
          console.log('tokens:', tokens);
          this.saveTokens(tokens.token, tokens.refresh_token);
        }),
        catchError((error) => {
          // this.logout();
          return of(false);
        })
      );
  }
}
