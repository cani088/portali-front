import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private _url='http://127.0.0.1:8000/api';
  constructor(private http:HttpClient) {
  } 
  
  getArticleData(id){
    let url=this._url+"/article/"+id;
    return this.http.get(url);
  }

  getComments(id){
    let url=this._url+"/article/"+id+"/comments";

    return this.http.get(url);
  }

  getArticles(type){
    let url=this._url+"/articles/"+type;
    return this.http.get(url);
  }

}
   