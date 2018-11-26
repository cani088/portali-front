import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../services/article.service';




@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  // public comments=[
  //   {
  //     "comment_id":20,
  //     "comment_body":"First main comment",
  //     "parent":0,
  //     "depth":0,
  //     "user":"User 1",
  //     "likes":30,
  //     "comments":8
  //   },
  //   {
  //     "comment_id":21,
  //     "comment_body":"I think its hilarious u kids talking shit about semphis. U wouldnt say this shit to him at LAN, hes jacked. Not only that but he wears the freshest clothes, eats at the chillest restaurants anddddddd hangs out with the hottest dudes. Yall are pathetic lol",
  //     "parent":20,
  //     "depth":1,
  //     "user":"User 2",
  //     "likes":30,
  //     "comments":8
  //   },
  //   {
  //     "comment_id":22,
  //     "comment_body":"reply to comment number",
  //     "parent":21,
  //     "depth":2,
  //     "user":"User 1",
  //     "likes":30,
  //     "comments":8
  //   },
  //   {
  //     "comment_id":23,
  //     "comment_body":"Another reply to comment number",
  //     "parent":21,
  //     "depth":2,
  //     "user":"User 4",
  //     "likes":30,
  //     "comments":8
  //   },
  //   {
  //     "comment_id":24,
  //     "comment_body":"Reply to some comment",
  //     "parent":22,
  //     "depth":3,
  //     "user":"User 5",
  //     "likes":30,
  //     "comments":8
  //   },
  //   {
  //     "comment_id":25,
  //     "comment_body":"Second main comment",
  //     "parent":0,
  //     "depth":0,
  //     "user":"User 1",
  //     "likes":30,
  //     "comments":8
  //   },
  //   {
  //     "comment_id":26,
  //     "comment_body":"Reply to Second main comment",
  //     "parent":25,
  //     "depth":1,
  //     "user":"User 8",
  //     "likes":30,
  //     "comments":8
  //   },
  //   {
  //     "comment_id":27,
  //     "comment_body":"Reply to Second main comment",
  //     "parent":25,
  //     "depth":1,
  //     "user":"User 8",
  //     "likes":30,
  //     "comments":8
  //   },
  //   {
  //     "comment_id":28,
  //     "comment_body":"Third main comment",
  //     "parent":0,
  //     "depth":0,
  //     "user":"User 1",
  //     "likes":30,
  //     "comments":8
  //   },
  //   {
  //     "comment_id":29,
  //     "comment_body":"Reply to some comment",
  //     "parent":24,
  //     "depth":4,
  //     "user":"User 6",
  //     "likes":30,
  //     "comments":8
  //   },
  //   {
  //     "comment_id":30,
  //     "comment_body":"Reply to some comment",
  //     "parent":29,
  //     "depth":5,
  //     "user":"User 7",
  //     "likes":30,
  //     "comments":8
  //   }
  // ];
  
  public comments:any;
  constructor(private articleService:ArticleService) { 

  }
  ngOnInit(){
    this.articleService.getArticleData()
    .subscribe((data)=>{
      this.comments=data[0].comments;
      console.log('comments',this.comments);
    });
  }

  ngAfterViewInit(){
    alert('asdas');
    this.loadComments();
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
    finalString+='<span class="user_name">'+e.user+'</span>';
    finalString+='<span class="comment_time">'+e.human_readable+'</span>';
    finalString+='<span class="likes_value">'+e.likes+' Likes</span>';
    finalString+='<span class="comments_value">'+e.comments+' Replies</span>';
    finalString+=comment_content;
    finalString+='</div>';
    return finalString;
  }

  appendButtons(e){
    var finalString='';
    finalString='<div id="buttons_'+e.comment_id+'" class="buttons_container">';
        finalString+="<button href='#' class='like_btn' onClick='likeComment("+e.comment_id+")'>Like</button>"; 
        finalString+="<button href='#' class='like_btn' onClick='unLikeComment("+e.comment_id+")'>Un-Like </button>"; 
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
}
