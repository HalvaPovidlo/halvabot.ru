import {Injectable} from "@angular/core";
import {HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest,} from "@angular/common/http";
import {BehaviorSubject, Observable, switchMap, throwError} from "rxjs";
import {JwtService} from "../services/jwt.service";
import {catchError} from "rxjs/operators";
import {Router} from "@angular/router";

@Injectable({providedIn: "root"})
export class TokenInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );

  constructor(
    private readonly jwtService: JwtService,
    private readonly router: Router
  ) {
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<any> {
    const token = this.jwtService.getToken();
    if (token) {
      req = this.addToken(req, token);
    }

    return next.handle(req).pipe
    (
      catchError((error) => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          return this.handle401Error(req, next);
        } else {
          return throwError(error.error);
        }
      })
    )
  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.jwtService.refreshToken().pipe(
        switchMap((token: any) => {
          console.log(token);
          this.isRefreshing = false;
          this.refreshTokenSubject.next(token);
          return next.handle(this.addToken(request, token))
        })
      )
    } else {
      console.log('else route');
      window.localStorage.removeItem('jwtToken');
      window.localStorage.removeItem('refreshToken');
      window.localStorage.removeItem('id');
      return this.router.navigate(['login']);
      // return this.refreshTokenSubject.pipe(
      //   filter((token) => token != null),
      //   take(1),
      //   switchMap((jwt) => {
      //     console.log(jwt);
      //     return next.handle(this.addToken(request, jwt))
      //   })
      // )
    }
  }
}
