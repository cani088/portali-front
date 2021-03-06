import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _url='http://127.0.0.1:8000/api';
  constructor(private http:HttpClient,private jwt:JwtHelperService) {
  
  } 

  getUser(id){
    let url=this._url+"/user/"+id;
    return this.http.get(url);
  }

  getUserComments(id){
    let url=this._url+"/user/"+id+"/comments";
    return this.http.get(url);    
  }

  register(data){
    let url=this._url+"/user/register";
    return this.http.post(url,data);
  }  

  login(data){
    let url=this._url+"/user/login";
    return this.http.post(url, data);
  }

  decodeToken(token){
    return this.jwt.decodeToken(token);
  }
}