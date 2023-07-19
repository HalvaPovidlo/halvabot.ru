import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";

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

  getAllUsers(): Observable<any> {
    return this.http
      .get<any>("http://178.154.221.12:9090/api/v1/users");
  }

  setAuth(user: User): void {
    this.jwtService.saveToken(user.token);
    this.currentUserSubject.next(user);
  }
}
