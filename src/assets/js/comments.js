 
function showTextArea(comment_id){
    document.getElementsByClassName('reply_textarea').style.display='none';
    document.getElementById('reply_textarea'+comment_id).style.display='block';
}
  
function cancelReply(comment_id){
    document.getElementById('textarea-'+comment_id).style.display='none';
}
  
  
function collapseComment(id){
    console.log('id',id);
    $divs=document.getElementsByClassName('parent-'+id);
    this.getDiv('collapse_btn_'+id).style.display='none';
    this.getDiv('expand_btn_'+id).style.display='inline-block';
    for(i=0;i<$divs.length;i++){
        $divs[i].style.display='none';
    }
}
  
function expandComment(id){
    console.log('id',id);

    $divs=document.getElementsByClassName('parent-'+id);
    this.getDiv('collapse_btn_'+id).style.display='inline-block';
    this.getDiv('expand_btn_'+id).style.display='none';
    for(i=0;i<$divs.length;i++){
        $divs[i].style.display='inline-block';
    }
}

function getDiv(div){
    return document.getElementById(div);
}