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

  getArticles(type,search_parameter){
    if(search_parameter){
      var url=this._url+"/articles/search/"+search_parameter;
    }else{
      var url=this._url+"/articles/"+type;
    }
    return this.http.get(url);
  }

  getRecommendedArticles(id){
    let url=this._url+"/articles/"+id+"/recommanded";
    return [];
  }

  getSimilarArticles(id){
    let url=this._url+"/articles/"+id+"/similar";
    return [];
  }

  getArticlesByTag(tag){
    let url=this._url+"/articles/tag/"+tag;
    return [];
  }

  likeArticle(id){
    let url=this._url+"/article/like";
    return this.http.post(url,{article_id:id});
  }
  
  unLikeArticle(id){
    let url=this._url+"/article/unlike";
    return this.http.post(url,{article_id:id});
  }

  submitComment(comment_data){
    let url=this._url+"/comment/submit";
    return this.http.post(url,comment_data);
  }
}
   