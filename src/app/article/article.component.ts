import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../services/article.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  
  //on articleData we will store the reponse from server
  public articleData:any;

  //variale to check if the article has Tags
  public hasTags=false;
  
  //variable to check if the article has an Image
  public hasImage=false;

  //the id of the article
  public id;

  //hehe
  public randomLikes;

  //form
  public formGroup;

  constructor(private articleService:ArticleService,private route:ActivatedRoute) {
    this.id=this.route.snapshot.params['id'];
    this.generateRandom();
  
  }

  generateRandom(){
    this.randomLikes=Math.floor(Math.random()*5)+7;
  }

  ngOnInit() {
    this.articleService.getArticleData(this.id)
      .subscribe((data)=>{
        this.articleData=data;

        if(this.articleData.tags.length>0){
          this.hasTags=true;
        }

        if(this.articleData.article_image!=null){
          this.hasImage=true;
        }
      });
  }

  likeArticle(){
    if(this.articleData.is_like==1){
      return false;
    }
    this.articleService.likeArticle(this.id)
      .subscribe((data:any)=>{
        if(data.success==1){
          this.articleData.is_like=1;
          this.articleData.total_likes+=2;
        }
      });
  }

  unLikeArticle(){
    if(this.articleData.is_like==0){
      return false;
    }
    this.articleService.unLikeArticle(this.id)
    .subscribe((data:any)=>{
      if(data.success==1){
        this.articleData.is_like=0;
        this.articleData.total_likes-=2;
      }
    });
  }



}
