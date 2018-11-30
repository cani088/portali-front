import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../services/article.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  //variable to store the comments
  public comments:any;
  
  //article id for comments
  public id;

  //boolean to check if post has comments 
  public hasComments=false;

  //store total number of comments
  public totalComments=0;
  constructor(private articleService:ArticleService, private route:ActivatedRoute) {
    console.log('Comments component loaded');
    
    this.id=route.snapshot.params['id'];
  }
  ngOnInit(){
    
  }

  ngAfterViewInit(){
    this.articleService.getComments(this.id)
    .subscribe((data)=>{
      this.comments=data;
      this.totalComments=this.comments.length;
      if(this.totalComments>0){
        this.loadComments();
      }
    });
  }

  loadComments(){
    this.comments.forEach(($e)=>{
        if($e.parent==0){
            document.getElementById('comments-container').insertAdjacentHTML('beforeend',this.appendComment($e,'main'));
        }else{
            document.getElementById('c-'+$e.parent).insertAdjacentHTML('beforeend',this.appendComment($e,'child'));
        }
    }); 
  }

  appendComment(e,type){
    // $color=getColor(e.depth);

    var finalString='';
    var comment_content='<span class="comment_body">'+e.comment_body+'</span>';
    
    comment_content+="<div class='buttons_below'>"+this.appendButtons(e)+"</div>";
    
    finalString+='<div class="'+type+' parent-'+e.parent+'"  style="border-left:1px solid #e0e0e0" id="c-'+e.comment_id+'">';
    finalString+='<span class="user_name">'+e.user_name+'</span>';
    finalString+='<span class="comment_time">'+e.human_readable+'</span>';
    finalString+='<span class="likes_value">'+e.total_likes+' Likes</span>';
    finalString+=comment_content;
    finalString+='</div>';
    return finalString;
  }

  appendButtons(e){
    var finalString='';
    finalString='<div id="buttons_'+e.comment_id+'" class="buttons_container">';
        if(e.is_like==1){
          finalString+="<button href='#' class='like_btn' onClick='unLikeComment("+e.comment_id+")'>Un-Like </button>"; 
        }else{
          finalString+="<button href='#' class='like_btn' onClick='likeComment("+e.comment_id+")'>Like</button>"; 
        }
        finalString+="<button href='#' class='comment_btn' onClick='showTextArea("+e.comment_id+")'>Reply</button>";
        finalString+="<button id='collapse_btn_"+e.comment_id+"' class='collapse_btn' onClick='collapseComment("+e.comment_id+")'>Collapse <img src='/assets/images/up-arrow.svg' width='10px' height='10px'/></button>";
        finalString+="<button id='expand_btn_"+e.comment_id+"' class='expand_btn' onClick='expandComment("+e.comment_id+")'>Expand <img src='/assets/images/down-arrow.svg' width='10px' height='10px'/></button>";
    finalString+='</div>';
    finalString+="<div class='reply_textarea' id='textarea-"+e.comment_id+"'>";
        finalString+="<form method='POST' action='/comment/reply'>"
            finalString+="<input type='hidden' name='comment_id' value='"+e.comment_id+"'/>";
            finalString+="<textarea placeholder='reply to comment' cols='80' name='comment_body' rows='4'></textarea>";
            finalString+="<input type='submit' class='reply_button' value='Reply'/>";
            finalString+="<button type='button' class='reply_button' onClick='cancelReply("+e.comment_id+")'>cancel</button>";
        finalString+="</form>"
    finalString+="</div>";
    return finalString;
  }

  submitComment(){
    
    console.log('bes');


  }

  besnik(){
    console.log('bes');
  }

}
