import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {Subject} from "rxjs";
import {UserService} from "../services/user.service";

interface AuthForm {
  email: FormControl<string>;
  password: FormControl<string>;
  username?: FormControl<string>;
}

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.less']
})
export class AuthComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<void>();

  constructor(
    private readonly userService: UserService
  ) {
  }

  login() {
    this.userService.login();
  }


  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit(): void {
  }
}
