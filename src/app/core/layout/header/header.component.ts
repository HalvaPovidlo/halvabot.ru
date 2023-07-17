import {Component, inject, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit{
  currentUser: any;
  constructor(
    private readonly userService: UserService
  ) {}

  ngOnInit(): void {
    this.userService.currentUser.subscribe(x => {
      this.currentUser = x
    })
  }
  // currentUser$ = inject()
}
