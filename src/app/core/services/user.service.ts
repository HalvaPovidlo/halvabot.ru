import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";

import {JwtService} from "./jwt.service";
import {distinctUntilChanged, map, tap} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {User} from "../models/user.model";
import {Router} from "@angular/router";

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
    private readonly router: Router
  ) {
  }

  login() {
    window.location.href = ` http://localhost:9090/api/v1/login`;
  }

  register(credentials: {
    username: string;
    email: string;
    password: string;
  }): Observable<{ user: User }> {
    return this.http
      .post<{ user: User }>("/users", {user: credentials})
      .pipe(tap(({user}) => this.setAuth(user)));
  }

  getAllUsers(): Observable<any> {
    return this.http
      .get<any>("http://localhost:9090/api/v1/users");
  }

  setAuth(user: User): void {
    this.jwtService.saveToken(user.token);
    this.currentUserSubject.next(user);
  }
}
