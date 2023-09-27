import React from 'react';
import Comment from '../Comment/Comment';
import './Post.css';

function Post({post}) {
    const thumbnailEnd = post.thumbnail.substring(post.thumbnail.length - 3, post.thumbnail.length);
    const urlEnd = post.url.substring(post.url.length - 3, post.url.length);
    const hasImg = thumbnailEnd === "png" || thumbnailEnd === "jpg" || urlEnd === "png" || urlEnd === "jpg"
    return (
        <div class="post">
            <h3>{post.title}</h3>
            <p>{post.selftext}</p>
            {
                //check if post has a preview image
                hasImg ?
                    <img src={post.thumbnail === "nsfw" || 
                        post.url.charAt(post.url.length - 1) === "g" ? post.url : post.thumbnail} alt="thumbnail"/>
                :
                    ""
            }
            {
                /*post.comments.map(comment => (
                    <Comment comment={comment} key={comment.id} />
                ))*/
            }
            <hr />
        </div>
    );
}

export default Post;