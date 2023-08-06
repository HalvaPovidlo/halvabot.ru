import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AuthComponent} from './core/auth/auth.component';
import {HeaderComponent} from './core/layout/header/header.component';
import {FooterComponent} from './core/layout/footer/footer.component';
import {HomeComponent} from './features/home/home.component';
import {ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {MoviesComponent} from './features/movies/movies.component';
import {MusicComponent} from './features/music/music.component';
import {MoviePageComponent} from './features/movie-page/movie-page.component';
import {NgOptimizedImage} from "@angular/common";
import {ErrorInterceptor} from "./core/interceptors/error.interceptor";
import {MinutesPipe} from "./core/pipes/minutes.pipe";
import {JwtService} from "./core/services/jwt.service";
import {UserService} from "./core/services/user.service";
import {EMPTY} from "rxjs";
import {ModalComponent} from "./core/components/modal/modal.component";
import {ScoresComponent} from './core/components/scores/scores.component';
import {NotificationComponent} from './core/components/notification/notification.component';
import {TokenInterceptor} from "./core/interceptors/token.interceptor";

export function initAuth(jwtService: JwtService, userService: UserService) {
  return () => (jwtService.getToken() ? userService.getCurrentUser() : EMPTY);
}

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    MoviesComponent,
    MusicComponent,
    MoviePageComponent,
    MinutesPipe,
    ModalComponent,
    ScoresComponent,
    NotificationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgOptimizedImage,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initAuth,
      deps: [JwtService, UserService],
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      // deps: [NotificationService],
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
