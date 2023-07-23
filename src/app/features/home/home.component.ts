import {Component, OnInit} from '@angular/core';
import {UserService} from "../../core/services/user.service";
import {ActivatedRoute} from "@angular/router";
import {User} from "../../core/models/user.model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  constructor(
    private readonly userService: UserService,
    private readonly route: ActivatedRoute
  ) {
  }

  login() {
    this.userService.login();
  }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        console.log(params);
        if (Object.keys(params).length) {
          this.userService.setAuth(params as User);
        }
      })
  }
}
