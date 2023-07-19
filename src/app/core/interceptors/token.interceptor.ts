import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest,} from "@angular/common/http";
import {Observable} from "rxjs";
import {JwtService} from "../services/jwt.service";
import {Router} from "@angular/router";

@Injectable({providedIn: "root"})
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private readonly jwtService: JwtService,
    private readonly router: Router) {
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.jwtService.getToken();

    const request = req.clone({
      setHeaders: {
        ...(token ? {Authorization: `Bearer ${token}`} : {}),
      },
    });

    return next.handle(request)
    // .pipe(
    //   catchError((e) => {
    //     this.router.navigate(['login']);
    //     return throwError(e.error);
    //   })
    // )
  }
}
