import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from '../services/article.service';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  
  public pageType;
  public articles;
  public randomLikes;
  constructor(private route:ActivatedRoute,private articleService:ArticleService) { 
    this.pageType=this.route.snapshot.url[0].path;
    this.generateRandom();
    // console.log('randomlikessssssssssssssss',this.randomLikes);  
  }

  generateRandom(){
    this.randomLikes=Math.floor(Math.random()*360)+1;   
  }

  ngOnInit() {
    this.articleService.getArticles(this.pageType)
    .subscribe((data)=>{
      this.articles=data;

      this.articles.forEach((e)=>{
        if(e.body.length>200){
          e.body=e.body.substring(0,200)+" ....";
        }
      });
    });
  }

}
