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
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    ArticleComponent,
    TopMenuComponent,
    CommentsComponent,
    LoginComponent,
    HomePageComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, 
    ReactiveFormsModule,
    RouterModule.forRoot([
      {path:'login',component:LoginComponent},
      {path:'article/:id',component:ArticleComponent},
      {path:'sport',component:HomePageComponent},
      {path:'new',component:HomePageComponent},
      {path:'interesante',component:HomePageComponent},
      {path:'top',component:HomePageComponent},
      {path:'search/:parameter',component:HomePageComponent},
      {path:'register',component:RegisterComponent}
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
