import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest,} from "@angular/common/http";
import {delay, mergeMap, Observable, of, retryWhen} from "rxjs";

@Injectable({providedIn: "root"})
export class ErrorInterceptor implements HttpInterceptor {
  maxRetries = 2;
  delayMs = 2000;

  constructor() {
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      retryWhen((error) => {
        return error.pipe(
          mergeMap((error, index) => {
            if (index < this.maxRetries && error.status == 500) {
              return of(error).pipe(delay(this.delayMs))
            }

            throw error;
          })
        )
      }),
    );
  }
}
