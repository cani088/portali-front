import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css']
})
export class TopMenuComponent implements OnInit {
  public pageType;
  public isLoggedIn=false;
  public ama=false;
  constructor() { 
   
  }
  ngOnInit() {
  }

}
