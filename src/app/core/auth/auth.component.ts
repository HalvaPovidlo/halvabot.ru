import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../services/user.service";
import {Subject, takeUntil} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";

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
export class AuthComponent implements OnInit, OnDestroy{
  authForm: FormGroup<AuthForm>;
  title = "";
  authType = "";
  isSubmitting = false;
  destroy$ = new Subject<void>();

  constructor(
    private readonly userService: UserService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
  ) {
    this.authForm = new FormGroup<AuthForm>({
      email: new FormControl("", {
        validators: [Validators.required],
        nonNullable: true,
      }),
      password: new FormControl("", {
        validators: [Validators.required],
        nonNullable: true,
      }),
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.authType = this.route.snapshot.url.at(-1)!.path;
    this.title = this.authType === 'login' ? 'Sign in' : 'Sign up';
    if(this.authType === "register") {
      this.authForm.addControl(
        'username',
        new FormControl("", {
          validators: [Validators.required],
          nonNullable: true,
        })
      )
    }
  }

  // submitForm(): void {
  //   this.isSubmitting = true;
  //
  //   let observable =
  //     this.authType === "login"
  //       ? this.userService.login(
  //         this.authForm.value as { email: string; password: string }
  //       )
  //       : this.userService.register(
  //         this.authForm.value as {
  //           email: string;
  //           password: string;
  //           username: string;
  //         }
  //       );
  //
  //   observable.pipe(takeUntil(this.destroy$)).subscribe({
  //     next: () => void this.router.navigate(["/"]),
  //     error: (err) => {
  //       this.isSubmitting = false;
  //     },
  //   });
  // }

}
