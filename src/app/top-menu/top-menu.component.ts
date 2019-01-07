import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css']
})
export class TopMenuComponent implements OnInit {
  public pageType;
  public isLoggedIn=false;
  public ama=false;
  public token;
  constructor(private userService:UserService) { 
    var token=this.userService.decodeToken(localStorage.getItem('token'));
    if(token){
      this.token=token;
      this.isLoggedIn=true;
    }
  }
  ngOnInit() {
  }

}
