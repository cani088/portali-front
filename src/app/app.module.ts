import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArticleComponent } from './article/article.component';
import { TopMenuComponent } from './top-menu/top-menu.component';
import { CommentsComponent } from './comments/comments.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';

@NgModule({
  declarations: [
    AppComponent,
    ArticleComponent,
    TopMenuComponent,
    CommentsComponent,
    LoginComponent,
    HomePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, 
    RouterModule.forRoot([
      {path:'login',component:LoginComponent},
      {path:'article/:id',component:ArticleComponent},
      {path:'sport',component:HomePageComponent},
      {path:'new',component:HomePageComponent},
      {path:'interesante',component:HomePageComponent},
      {path:'top',component:HomePageComponent}
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
