import {NgModule} from '@angular/core';
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
import {TokenInterceptor} from "./core/interceptors/token.interceptor";
import {ErrorInterceptor} from "./core/interceptors/error.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    MoviesComponent,
    MusicComponent,
    MoviePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgOptimizedImage
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
