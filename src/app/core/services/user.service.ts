import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable, tap} from "rxjs";

import {JwtService} from "./jwt.service";
import {distinctUntilChanged, map} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {User} from "../models/user.model";
import {environment} from "../../../environments/environment";

@Injectable({providedIn: "root"})
export class UserService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser = this.currentUserSubject
    .asObservable()
    .pipe(distinctUntilChanged());
  public isAuthenticated = this.currentUser.pipe(map((user) => !!user));

  constructor(
    private readonly http: HttpClient,
    private readonly jwtService: JwtService,
  ) {
  }

  login() {
    window.location.href = `${environment.authApiURL}/api/v1/login`;
  }


  authenticate() {
    this.getAllUsers()
      .subscribe((data) => {
        console.log(data);
      }, (err) => {
        console.log(err);
      })
  }

  getAllUsers(): Observable<any> {
    return this.http
      .get<any>(`${environment.authApiURL}/api/v1/users`)
      .pipe(
        map(obj => obj?.users)
      )
  }

  getCurrentUser(): Observable<any> {
    return this.jwtService.refreshToken()
      .pipe(
        tap((user) => {
          // console.log(user);
          this.setAuth(user);
        })
      )
  }

  //   shareReplay(1)
  // )

  purgeAuth(): void {
    this.jwtService.clearStorage();
    this.currentUserSubject.next(null);
  }

  setAuth(user: User): void {
    // console.log(user);
    this.jwtService.saveTokens(user.token, user.refresh_token);
    this.jwtService.saveId(user.id);
    this.currentUserSubject.next(user);
  }
}
