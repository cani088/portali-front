import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css']
})
export class TopMenuComponent implements OnInit {

  public isLoggedIn=false;
  public pageType='sport';
  public ama=false;
  constructor(private route:ActivatedRoute) { 
    console.log('asdkamsdas',this.route.snapshot);
    // this.pageType=this.route.snapshot.url[0].path;
    // console.log('this.pagetype',this.pageType);
  }
  ngOnInit() {
  }

}
