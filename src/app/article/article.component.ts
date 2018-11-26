import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../services/article.service';

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

  constructor(private articleService:ArticleService) { }

  ngOnInit() {
    this.articleService.getArticleData()
      .subscribe((data)=>{
        this.articleData=data[0];
             
        if(this.articleData.tags.length>0){
          this.hasTags=true;
        }

        if(this.articleData.article_image!=null){
          this.hasImage=true;
        }
      });
  }

}
