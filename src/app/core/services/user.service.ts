import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable, of} from "rxjs";

import {JwtService} from "./jwt.service";
import {distinctUntilChanged, map} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {User} from "../models/user.model";

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
    window.location.href = `http://178.154.221.12:9090/api/v1/login`;
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
      .get<any>("http://178.154.221.12:9090/api/v1/users");
  }

  getCurrentUser(): Observable<any> {
    return of(this.currentUser);
  }

  setAuth(user: User): void {
    console.log(user);
    this.jwtService.saveTokens(user.token, user.refresh_token);
    this.jwtService.saveId(user.id);
    this.currentUserSubject.next(user);
  }
}
