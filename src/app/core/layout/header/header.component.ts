import {Component, inject, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {
  currentUser$ = inject(UserService).currentUser;
  public isBlueTheme = true;

  onThemeSwitchChange() {
    this.isBlueTheme = !this.isBlueTheme;

    if(this.isBlueTheme) {
      document.body.setAttribute(
        'data-theme',
        'blue'
      );
      window.localStorage.setItem('theme', 'blue')
    } else {
      document.body.setAttribute(
        'data-theme',
        'dark'
      );
      window.localStorage.setItem('theme', 'dark')
    }
  }
  ngOnInit(): void {
    const theme = window.localStorage.getItem('theme');
    console.log(theme)
    document.documentElement.setAttribute("data-theme", theme == null ? 'blue' : theme);
    this.isBlueTheme = theme != 'dark';
  }
}
