import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class CommentsService {

  private _url='';
  constructor(private http:HttpClient) {} 

  getCommentsData(id){
    this._url='http://127.0.0.1:8000/api/article/'+id+'/comments';
    return this.http.get(this._url);
  }
}

