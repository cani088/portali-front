import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private _url='';
  constructor(private http:HttpClient) {
  } 
  
  getArticleData(id){
    this._url='http://127.0.0.1:8000/api/article/'+id;
    return this.http.get(this._url);
  }
}
   