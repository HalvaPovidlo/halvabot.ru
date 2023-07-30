import {Component, inject, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {
  currentUser$ = inject(UserService).currentUser;

  ngOnInit(): void {
    if (window.localStorage['jwtToken']) {

    }
  }
}
