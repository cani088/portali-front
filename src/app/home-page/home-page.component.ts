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
  public search_parameter=false;
  constructor(private route:ActivatedRoute,private articleService:ArticleService) { 
    this.pageType=this.route.snapshot.url[0].path;

    if(this.pageType=='search'){
      this.search_parameter=route.snapshot.params['parameter'];
    }

    this.generateRandom();
    // console.log('randomlikessssssssssssssss',this.randomLikes);  
  }

  generateRandom(){
    this.randomLikes=Math.floor(Math.random()*360)+1;   
  }

  ngOnInit() {
    this.articleService.getArticles(this.pageType,this.search_parameter)
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
