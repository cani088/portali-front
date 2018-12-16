import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../services/article.service';
import { ActivatedRoute } from '@angular/router';
import { FormsModule, FormBuilder } from '@angular/forms';

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

  //forma :/
  public myForm;
  //store total number of comments
  public totalComments=0;

  //if the comment form is empty the user can not submit
  public canSubmit=false;
  
  constructor(private articleService:ArticleService, private route:ActivatedRoute, private fb:FormBuilder) {    
    this.id=route.snapshot.params['id'];
  }
  ngOnInit(){
    this.myForm=this.fb.group({
      comment:""
    });
  }

  ngAfterViewInit(){

    //get comments data where id is the article id
    this.articleService.getComments(this.id)
    .subscribe((data)=>{
      this.comments=data;
      this.totalComments=this.comments.length;
      //if there are comments for the article we call the loadComments method
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
    var comment_content=`<span class="comment_body">${e.comment_body}</span>`;
    
    comment_content+=`<div class='buttons_below'>${this.appendButtons(e)}</div>`;
    
    finalString+=`<div class="${type} parent-${e.parent}" style="border-left:1px solid #e0e0e0" id="c-${e.comment_id}">`;
    finalString+=`<span class="user_name">${e.username}</span>`;
    finalString+=`<span class="comment_time">${e.human_readable}</span>`;
    finalString+=`<span class="likes_value">${e.total_likes} Likes</span>`;
    finalString+=comment_content;
    finalString+=`</div>`;
    return finalString;
  }

  appendButtons(e){
    var finalString='';
    finalString=`<div id="buttons_${e.comment_id}" class="buttons_container">`;
        if(e.is_like==1){
          finalString+=`<button href='#' class='like_btn' onClick='unLikeComment(${e.comment_id})'>Un-Like </button>`; 
        }else{
          finalString+=`<button href='#' class='like_btn' onClick='likeComment(${e.comment_id})'>Like</button>`; 
        }
        finalString+=`<button href='#' class='comment_btn' onClick='showTextArea(${e.comment_id})'>Reply</button>`;
        finalString+=`<button id='collapse_btn_${e.comment_id}' class='collapse_btn' onClick='collapseComment(${e.comment_id})'>Collapse <img src='/assets/images/up-arrow.svg' width='10px' height='10px'/></button>`;
        finalString+=`<button id='expand_btn_${e.comment_id}' class='expand_btn' onClick='expandComment(${e.comment_id})'>Expand <img src='/assets/images/down-arrow.svg' width='10px' height='10px'/></button>`;
    finalString+='</div>';
    finalString+=`<div class='reply_textarea' id='textarea-${e.comment_id}'>`;
       
          finalString+=`<input type='hidden' name='comment_id' value='${e.comment_id}'/>`;
          finalString+="<textarea placeholder='reply to comment' cols='80' name='comment_body' rows='4'></textarea>";
          finalString+=`<input type='submit' class='reply_button' onClick='submitReply(${e.comment_id})' value='Reply'/>`;
          finalString+=`<button type='button' class='reply_button' onClick='cancelReply(${e.comment_id})'>cancel</button>`;
     
    finalString+="</div>";
    return finalString;
  }

  submitReply(id){
    return this.submitComment(id);
  }

  submitComment(parent){    
    var comment_data={
      parent:parent,
      comment_body:this.myForm.value.comment,
      article_id:this.id
    };
    var res=this.articleService.submitComment(comment_data);
    res.subscribe((data:any)=>{
      if(data.success==1){
        //when the user has been registered successfully
        data.comment.total_likes=0;
        data.comment.human_readable='2 seconds ago';
        if(parent==0){
          document.getElementById('comments-container').insertAdjacentHTML('beforeend',this.appendComment(data.comment,'main'));
        }else{
          document.getElementById('c-'+parent).insertAdjacentHTML('beforeend',this.appendComment(data.comment,'child'));
      }
        console.log('data on success',data);
      }else{
        //when there has been an error
        console.log('data on failure',data);
      }
    }); 
  }

  besnik(){
    console.log('bes');
  }



}
