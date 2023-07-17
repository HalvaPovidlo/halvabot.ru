import {inject, NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./features/home/home.component";
import {AuthComponent} from "./core/auth/auth.component";
import {UserService} from "./core/services/user.service";
import {isArray} from "@angular/compiler-cli/src/ngtsc/annotations/common";
import {map} from "rxjs/operators";
import {MoviesComponent} from "./features/movies/movies.component";
import {MusicComponent} from "./features/music/music.component";
import {MoviePageComponent} from "./features/movie-page/movie-page.component";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "login",
    component: AuthComponent,
    canActivate: [() => inject(UserService).isAuthenticated.pipe(map((isAuth) => !isAuth))]
  },
  {
    path: "register",
    component: AuthComponent,
    canActivate: [() => inject(UserService).isAuthenticated.pipe(map((isAuth) => !isAuth))]
  },
  {
    path: "movies",
    component: MoviesComponent
  },
  {
    path: "music",
    component: MusicComponent
  },
  {
    path: "movies/:id",
    component: MoviePageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
